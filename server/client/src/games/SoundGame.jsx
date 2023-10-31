import { useEffect, useRef, useState } from 'react';
import {useNavigate, Link} from 'react-router-dom'
import '../stylesheets/redLightGreenLight.css'
import { useUser } from '../hooks/useUser';

export default function RedLightGreenLight(){
    const blue = 'rgb(0, 102, 255)';
    const red = 'rgb(255, 40, 40)';
    const green = 'rgb(0, 218, 15)';
    const [rounds, setRounds] = useState(5);
    const [totalReactionTime, setTotalReactionTime] = useState(0);
    const [correctClicks, setCorrectClicks] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const gameMidText = useRef();
    const gameTopText = useRef();
    const startMidText = useRef();
    const startTopText = useRef();
    const startButton = useRef();
    const gameBox = useRef();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const color = useRef()

    const timeoutRef = useRef(null);
    useEffect(() => {
        startMidText.current.textContent = 'Start Game';
        return () => {
            if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    function startButtonClick(){
        if(!loading){
            setSuccess(false);
            setError(false);
            //hide start box and show game box
            startButton.current.style.display = 'none';
            gameBox.current.style.display = 'flex';
            gameBox.current.style.backgroundColor = blue;
            gameBox.current.classList.remove('whiteBg')
            color.current = blue;
    
            //countdown then start game
            gameMidText.current.textContent = '3'
            timeoutRef.current = setTimeout(() => {
                gameMidText.current.textContent = '2'
                timeoutRef.current = setTimeout(() => {
                    gameMidText.current.textContent = '1'
                    timeoutRef.current = setTimeout(()=>{
                        gameMidText.current.textContent = ''
                        playRound()
                    }, 1000); 
                }, 1000);
            }, 1000);

        }
    }

    function gameBoxClick(){
        //if user clicked on time
        if (color.current === green) {
            //change box color
            gameBox.current.style.backgroundColor = blue
            gameBox.current.classList.remove('whiteBg')
            color.current = blue
            
            //if game didn't end
            if (rounds > 0){
                //calculate and display reaction time
                const endTime = new Date().getTime();
                const reactionTime = (endTime - startTime);
                setTotalReactionTime(prev=>prev+reactionTime)
                gameTopText.current.textContent = `Reaction Time: ${reactionTime} ms`;

                //countdown then start game
                gameMidText.current.textContent = '3'
                timeoutRef.current = setTimeout(() => {
                    gameMidText.current.textContent = '2'
                    timeoutRef.current = setTimeout(() => {
                        gameMidText.current.textContent = '1'
                        timeoutRef.current = setTimeout(()=>{
                            gameTopText.current.textContent = ''
                            playRound()
                        }, 1000); 
                    }, 1000);
                }, 1000);
            } else {
                endGame(true);
            }
            
            setCorrectClicks(prev=>prev + 1)
        } //if user clicked early
        else if(color.current === red){
            //change box color and display text
            gameBox.current.style.backgroundColor = blue;
            gameBox.current.classList.remove('whiteBg')
            color.current = blue;
            gameTopText.current.textContent = 'too early';
            
            //if game didn't end
            if (rounds > 0){
                //countdown then start game
                gameMidText.current.textContent = '3'
                timeoutRef.current = setTimeout(() => {
                    gameMidText.current.textContent = '2'
                    timeoutRef.current = setTimeout(() => {
                        gameMidText.current.textContent = '1'
                        timeoutRef.current = setTimeout(()=>{
                            gameTopText.current.textContent = ''
                            playRound()
                        }, 1000); 
                    }, 1000);
                }, 1000);
            } else {
                endGame(false);
            }
        }
    }

    function playRound() {
        if (rounds > 0) {
            //display text
            gameTopText.current.textContent = '';
            gameMidText.current.textContent = 'Click when you hear the sound.';
            //box is red
            gameBox.current.style.color = 'black';
            gameBox.current.style.backgroundColor = 'white';
            gameBox.current.classList.add('whiteBg')
            color.current = red
    
            //after random time
            timeoutRef.current = setTimeout(() => {
                //if user didn't click early
                if(color.current === red){
                    //box is green
                    playSound()
                    color.current = green;
                    //start counter
                    setStartTime(new Date().getTime())
                }
            }, Math.random() * 2000 + 1000); 
    
            setRounds(prev=> prev - 1);
        }
    }

    function endGame(clickedGreen) {
        //hide game box and show start box
        gameBox.current.style.display = "none";
        startButton.current.style.display = "flex";

        //calculate result
        let result;
        //if user clicked green in the last round
        if(clickedGreen){
            let lastRound = new Date().getTime() - startTime;
            result = (totalReactionTime + lastRound) / (correctClicks+1)
        } 
        //if user clicked too early
        else {
            result = totalReactionTime / (correctClicks === 0 ? 1 : correctClicks)
        }
        result = Math.ceil(result);
        //display text
        startTopText.current.textContent = `Average Reaction Time: ${result} ms`;
        
        //reset game box text
        gameTopText.current.textContent = '';
        gameMidText.current.textContent = '';
        
        //reset variables
        setRounds(5);
        setTotalReactionTime(0);
        setCorrectClicks(0);

        //upload results then show restart button
        // uploadResult(result)
    }

    function uploadResult(result) {
        setLoading('Uploading your result...')
        setError(false)
        setSuccess(false)
        fetch('https://bioclock.onrender.com/api/gameResult', {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({result, game: 'sound game'}),
            credentials: 'include'
        }).then(res => {
            if(!res.ok){
                setLoading(false)
                throw Error("couldn't upload result. Please play again")
            }
            return res.json()
        }).then(res => {
            setLoading(false)
            if(res.success){
                startMidText.current.textContent = 'Restart Game'
                setSuccess(true)
            }else{
                throw Error(res.message)
            }
        }).catch(err => {
            setError(err.message)
            setLoading(false)
            setSuccess(false)
            startMidText.current.textContent = 'Restart Game'
        })
    }
    function playSound(){
        let sound = document.getElementById('audio')
        sound.play()    
    }

    let userInfo = useUser()
    let navigate = useNavigate();
    return(<>
    {userInfo.auth === false && navigate('../login', {replace: true})}
     <header data-bs-theme="dark">
        <div className="navbar navbar-dark bg-dark shadow-sm" style={{position: 'fixed', zIndex: '100', top: '0', width: '100%', height: '60px', justifyContent: 'center'}}>
          <div >
            <Link to="../" className="navbar-brand d-flex align-items-center m-0">
              <strong>Biological Clock</strong>
            </Link>
          </div>
        </div>
      </header>
           
    <div className='d-flex flex-column align-items-center pt-8 bg-body-tertiary'>

    {error && 
        <div id='popup'>
        <p style={{margin: '0', padding: '10px 20px'}}>{error}</p>
        <button className='btn btn-close p-3' onClick={()=>setError(false)} />
        </div>
    }
    {loading && 
        <div id='popup' className='loadingPopup'>
        <p style={{margin: '0', padding: '10px 20px'}}>{loading}</p>
        </div>
    }
    {success && 
        <div id='popup' className='successPopup'>
        <p style={{margin: '0', padding: '10px 20px'}}>Result uploaded successfully!</p>
        <button className='btn btn-close p-3' onClick={()=>setSuccess(false)} />
        </div>
    }
       
        <h2>Sound Game</h2>
        <div className='container'>

            <div id="startButton" 
              className='card shadow-sm'
              onClick={startButtonClick} 
              ref={startButton}>
              
                <p id="startTopText" ref={startTopText}></p>
                <p id="startMidText" ref={startMidText}></p>
            </div>

            <div id="gameBox" 
              className='card shadow-sm'
              ref={gameBox}
              onClick={gameBoxClick}>

                <p id="gameTopText" ref={gameTopText}></p>
                <p id="gameMidText" ref={gameMidText}></p>
            </div>

        </div>
    </div></>)
}
