import {useEffect, useState} from 'react'
import './App.css'

function Card({pokemonID,handleClick}) {

    const api = 'https://pokeapi.co/api/v2/pokemon/';

    const [cardApi, setCardApi] = useState(api+pokemonID);

    const [cardData, setCardData] = useState({
        id:"",
        name:"",
        sprites:{
            other:{
                "official-artwork":{
                    front_default:"",
                    front_shiny:""
                }
            }
        }
    })



    useEffect(()=>{

        setCardApi(api+pokemonID);

        fetch(cardApi)
            .then((res)=>{
                return res.json();
            })
            .then((data)=>{
                setCardData(data);
            })



    },[pokemonID, cardApi])

    return (
        <div className={"card"} onClick={()=>{
            handleClick(pokemonID);
        }}>
            <div className={"card-pokemon-photo"}>
                <img src = {cardData.sprites.other["official-artwork"].front_default} />
            </div>
            <div className={"card-pokemon-name"}>
                <h3>{cardData.name}</h3>
            </div>
        </div>
    );
}

function CardGame(){



    const idList = [1,  2,  3,  4,  5,  6,  7,  8,  9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50]

    const backup = [
        1,  2,  3,  4,  5,  6,  7,  8,  9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
        71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
        91, 92, 93, 94, 95, 96, 97, 98, 99,100,
        101,102,103,104,105,106,107,108,109,110,
        111,112,113,114,115,116,117,118,119,120,
        121,122,123,124,125,126,127,128,129,130,
        131,132,133,134,135,136,137,138,139,140,
        141,142,143,144,145,146,147,148,149,150,
        151
    ]

    const randomValue = () =>{
        return idList[Math.floor(Math.random() * idList.length)];
    };

    const [allCards, setAllCards] = useState(idList);

    const [selectedCards, setSelectedCards] = useState([])

    const [currentCards, setCurrentCard] = useState(()=>{
        let temp = new Set();
        while(temp.size!==3){
            temp.add(randomValue());
        }
        temp = Array.from(temp);

        return temp;
    });

    const handleScore = (pokemonID) =>{

        const temp = [...selectedCards];

        if(!(temp.includes(pokemonID))){
            console.log(temp);
            temp.push(pokemonID);
            setSelectedCards(temp);
        }else{
            setSelectedCards([]);
        }
        setCurrentCard(()=>{
            let temp = new Set();
            while(temp.size!==3){
                temp.add(randomValue());
            }
            temp = Array.from(temp);

            return temp;
        })
    }

    const [gameWin, setGameWin] = useState(false)


    useEffect(()=>{
        if(selectedCards.length === 10){
            setGameWin(true)
            setInterval(() => {
                setGameWin(false)
            }, 3000)

            setSelectedCards([])
        }
    },[selectedCards])


    if(gameWin){
        return (
            <div className={"gameBoard"}>
                <h1>You Win!</h1>
            </div>
        );
    }
    console.log(selectedCards)
    console.log("Score: " + selectedCards.length);

    return(
        <div className={"playZone"}>
            <div className={"scoreBoard"}>
                <h3>{selectedCards.length}/10</h3>
            </div>

            <div className="cardGame">
                {currentCards.map((cardID)=> <Card pokemonID={cardID} key={cardID} handleClick={handleScore}/>)}
            </div>
        </div>
    );
}

function PlayGame({playBool,handleClick}) {

    if (!playBool) {
        return (
            <div className={"gameBoard"} onClick={handleClick}>
                <button className={"playButton"}>
                    <img src="../public/pokeball%20icon.png"/>
                </button>
            </div>
        );
    } else {
        return (
            <>
                <CardGame/>
            </>
        );
    }


}


function App() {

    const [playBool, setPlayBool] = useState(false)

    const handlePlayGame = () =>{
        setPlayBool(!playBool);
    }

    return (
        <div className={"mainPage"}>

            <div className={"title shine"}>
                <img src="../public/pokemon_Title.png"/>
            </div>

            <PlayGame playBool={playBool} handleClick={handlePlayGame}/>

            <div className={"utilities"}>
                <div className={"utilities-left"}>
                    <button><img src="../public/megaphone-solid-24.png"/></button>
                    <button><img src="../public/music-solid-24.png"/></button>
                </div>
            </div>
        </div>
    );
}

export default App
