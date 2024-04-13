import {useEffect, useRef, useState} from 'react'
import './App.css'
import useSound from "use-sound";

function SwitchButton({stateInitial,stateNext}){
    const [stateBool, setStateBool] = useState(false);
    const audioRef = useRef();


    const handleClick = () =>{
        stateBool ? audioRef.current.play(): audioRef.current.pause();
        setStateBool(!stateBool);
    }

    return(
        <button onClick={handleClick}>
            {stateBool?stateNext:stateInitial}
            <audio src="https://dl.vgmdownloads.com/soundtracks/pokemon-firered-leafgreen-music-super-complete/nixinsogwg/1-03.%20Title%20Screen.mp3" loop ref={audioRef} autoPlay="autoplay"/>
        </button>
    );
}



function Card({pokemonID,handleClick,handleClickSound}) {

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
            handleClickSound();
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

function CardGame({handleClickSound}){

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


    const idList = [1,  2,  3,  4,  5,  6,  7,  8,  9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,]


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

            const winSound = new Audio("https://dl.vgmdownloads.com/soundtracks/pokemon-firered-leafgreen-music-super-complete/ebvweqrrvv/1-19.%20Victory%21%20%28Wild%20Pok%C3%A9mon%29.mp3")
            winSound.play();

            setInterval(() => {
                winSound.pause();
                setGameWin(false)
            }, 6000)

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
                {currentCards.map((cardID)=> <Card pokemonID={cardID} key={cardID} handleClick={handleScore} handleClickSound = {handleClickSound}/>)}
            </div>
        </div>
    );
}

function PlayGame({playBool,handleClick,handleClickSound}) {

    if (!playBool) {
        return (
            <div className={"gameBoard"} onClick={()=>{
                handleClickSound();
                handleClick();
            }}>
                <button className={"playButton"}>
                    <img src="/pokeball%20icon.png"/>
                </button>
            </div>
        );
    } else {
        return (
            <>
                <CardGame handleClickSound = {handleClickSound}/>
            </>
        );
    }


}


function App() {

    const [playBool, setPlayBool] = useState(false)

    const playMusic = (<svg
        viewBox="0 0 640 512">
        <path
            d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/>
    </svg>)

    const pauseMusic = (<svg
        viewBox="0 0 576 512">
        <path
            d="M151.6 188L288 66.7V445.3L151.6 324c-2.9-2.6-6.7-4-10.6-4H56c-13.3 0-24-10.7-24-24V216c0-13.3 10.7-24 24-24h85c3.9 0 7.7-1.4 10.6-4zM290.2 32c-7.3 0-14.3 2.7-19.8 7.5L134.9 160H56c-30.9 0-56 25.1-56 56v80c0 30.9 25.1 56 56 56h78.9L270.4 472.5l10.6-12-10.6 12c5.5 4.8 12.5 7.5 19.8 7.5c16.5 0 29.8-13.3 29.8-29.8V61.8C320 45.3 306.7 32 290.2 32zM411.3 164.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L457.4 256l-68.7 68.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L480 278.6l68.7 68.7c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L502.6 256l68.7-68.7c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L480 233.4l-68.7-68.7z"/>
    </svg>)

    const handlePlayGame = () => {
        setPlayBool(!playBool);
    }

    const handleClickSound = () => {
        const audio = new Audio("/public/clickSound.mp3");
        audio.play();
    }


    return (
        <div className={"mainPage"}>

            <div className={"title shine"}>
                <img src="/pokemon_Title.png"/>
            </div>

            <PlayGame playBool={playBool} handleClick={handlePlayGame} handleClickSound = {handleClickSound}/>

            <div className={"utilities"}>
                <div className={"utilities-left"}>
                    <SwitchButton stateInitial={playMusic} stateNext={pauseMusic}/>
                    {/*<button className={"musicButton"}>*/}
                    {/*    <img src="/music-solid-24.png"/>*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    );
}

export default App
