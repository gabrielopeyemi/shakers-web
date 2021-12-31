import { Alert } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import ButtonWithLoader from '../../Component/ButtonWithLoader/ButtonWithLoader';
import Dice from '../../Component/Dice/Dice';
import DiceRolling from '../../Component/Dice/DiceRolling';
import { wrappedLocalStorage } from '../../functions';
import { CheckIfUserIsInAGameQuery } from '../../Queries/CheckIfUserIsInAGameQuery';
import { getGameByIdQuery } from '../../Queries/GetGameById';
import { getGameThrows } from '../../Queries/GetGameThrowsQuery';
import { updateGameScore } from '../../Queries/UpdateGameScore';
import { useInterval } from '../../useInterval';
import { Auth, Container } from '../main.styles';
import { DiceDiv } from './PlaygroundPage.style';

export default function PlaygroundPage({ }: any): ReactElement {
    let history = useHistory();

    const token = wrappedLocalStorage('TOKEN').get();
    const userDetails = wrappedLocalStorage('USERDETAILS').get(true);

    if (!token) {
        history.push("/");
    }
    const [diceOne, setDiceOne] = useState<number>(1);
    const [diceTwo, setDiceTwo] = useState<number>(1);
    const [rolling, setRolling] = useState(false);
    const [gameDetails, setGameDetails] = useState<any>({});
    const [canPlay, setCanPlay] = useState<boolean>(false);
    const [gameIsLoading, setGameIsLoading] = useState(true);
    const [playWait, setPlayWait] = useState(false);
    const [otherPlayerPlayed, setOtherPlayerPlayed] = useState(false);
    const [otherPlayerGame, setOtherPlayerGame] = useState<number[]>([]);
    const [played, setPlayed] = useState([]);
    const [otherGameDisplayed, setOtherGameDisplayed] = useState(false);
    const [winnerMessage, setWinnerMessage] = useState<string>("");


    const getNewNumber = () => {
        return Math.floor(Math.random() * 6) + 1
    };


    useInterval(() => {
        if (!gameDetails._id) {
            return;
        }

        getThrows(gameDetails._id, token).then((throwsData: any) => {



            const { data } = throwsData;

            const noPlaysYet = data.length === 0;
            const existingPlay = data.length === 1;
            const bothSidesPlay = data.length === 2;
            let _otherPlayerPlayed = bothSidesPlay || false;
            let _otherPlayerGame = [];


            const youPlayed = existingPlay ? data[0].thrownBy === userDetails._id : false;


            if (existingPlay || bothSidesPlay) {
                for (let i = 0; i < data.length; i++) {
                    const { thrownBy = null, values = null } = data[i];
                    if (thrownBy && String(thrownBy) !== String(userDetails._id)) {
                        _otherPlayerPlayed = true;
                        _otherPlayerGame = values;
                        break;
                    }
                }
            }

            if (bothSidesPlay) {
                getGameById().then((gameDetails: any) => {
                    gameDetails.winner = gameDetails.winner._id
                    processWinnerMessage(gameDetails, userDetails);

                });
            }

            const youDidNotPlay = !youPlayed
            const youShouldPlay = existingPlay && youDidNotPlay;

            if (noPlaysYet && gameDetails.status === 'Player One') {
                setCanPlay(true);
                setPlayed([]);
            }

            if (youPlayed) {
                setCanPlay(false);
                setPlayed(data[0].values || []);
            }

            if (!otherGameDisplayed && _otherPlayerPlayed) {
                displayOtherPlayerGame(_otherPlayerGame);
                setCanPlay(false);
                return;
            }

            if (youShouldPlay) {
                setCanPlay(true);
                setPlayed([]);
            }


            setGameIsLoading(false);

        });
    }, 3000);

    useEffect(() => {
        if (winnerMessage || gameDetails.winner) {
            alert(" A winner already exist")
            return;
        }

        updateGameDetails();

    }, []);

    const processWinnerMessage = (gDetails: any, uDetails: any) => {
        if (gDetails.winner && String(gDetails.winner) === String(uDetails._id)) {
            setWinnerMessage("You won the Game! Hurray");
        }

        if (gDetails.winner && String(gDetails.winner) !== String(uDetails._id)) {
            setWinnerMessage("You lost the Game! Sorry");
        }

    }

    const updateGameDetails = async (turnOffRedirect: boolean = false) => {
        getGame(token, turnOffRedirect).then((gameDetails: any) => {
            if (!gameDetails) {
                return
            }

            let status = 'unknown';
            if (userDetails._id === gameDetails?.starter?._id) {
                status = 'Player One';
            }

            if (userDetails._id === gameDetails?.joiner?._id) {
                status = 'Player Two';
            }

            processWinnerMessage(gameDetails, userDetails);



            gameDetails.status = status

            setGameDetails(gameDetails);
        });
    }

    const getGameStyle = () => {
        const opacity = canPlay ? '0' : '0.5';
        return {
            background: `rgba(0, 0, 0, ${opacity})`
        }
    }


    const RollDice = () => {
        if (!canPlay) {
            alert("You are not allowed to roll dice yet");
            return;
        }
        setRolling(true);
        let a = getNewNumber()
        let b = getNewNumber()
        setDiceTwo(a);
        setDiceOne(b);
        setTimeout(() => {
            updateGameThrows(gameDetails._id, token, [a, b]).then((result: any) => {
                const { data } = result;
                if (data.winner && data.winner === String(userDetails._id)) {
                    setWinnerMessage("You won the Game! Hurray");
                }

                if (data.winner && data.winner !== String(userDetails._id)) {
                    setWinnerMessage("You lost the Game! Sorry");
                }

                setRolling(false);
                setCanPlay(false);

            })
            return;
        }, 2000)
    };

    const displayOtherPlayerGame = (values: number[]) => {
        setRolling(true);
        setTimeout(() => {
            setOtherPlayerPlayed(true);
            setOtherPlayerGame(values);
            setDiceTwo(values[0]);
            setDiceOne(values[1]);
            setOtherGameDisplayed(true);
            setRolling(false);
        }, 3000)
    };

    const getGame = async (token: string, turnOffRedirect: boolean = false) => {
        try {
            const response = await CheckIfUserIsInAGameQuery(token);
            const main = response.data.data;
            if (main.success) {
                if (main.data === null) {
                    return !turnOffRedirect && history.push('/dashboard')
                }
                wrappedLocalStorage('game-details', main.data).set();

                if (main.data.joiner === undefined) {
                    return !turnOffRedirect && history.push('/waiting-for-team-mate');
                }
                return main.data;
            }
        } catch (error) {

        }
    }


    const getGameById = async () => {
        try {
            const response = await getGameByIdQuery(token, gameDetails._id);
            const main = response.data.data;
            return main.data;

        } catch (error) {

        }
    }

    const getThrows = async (gameId: string, token: string) => {
        try {
            const response = await getGameThrows(gameId, token);
            return response.data.data;
        } catch (error) {
            console.log(error)
            alert("something went wrong")
        }
    }

    const updateGameThrows = async (gameId: string, token: string, values: number[]) => {
        try {
            const response = await updateGameScore(
                {
                    gameId, token, value1: values[0], value2: values[1]
                }
            );
            return response.data.data;
        } catch (error) {
            console.log(error)
            alert("something went wrong")
        }
    }

    const getUserMessage = () => {
        if (canPlay) return "Your Turn, Roll the dice";
        if (!gameDetails?.joiner?._id) return "Waiting for a user to join";
        const otherUser = gameDetails.status === 'Player One' ? 'Player two' : 'Player One';
        return !otherPlayerPlayed ? `Waiting for ${otherUser} to Play` : ''
    }

    if (gameIsLoading) {
        return (<div>
            <h2>Game is Loading</h2>
            <DiceRolling />
        </div>);
    }

    return (
        <div>
            <div>

                <p className="details">  Status : You are {gameDetails.status}</p>
                <p className="details">  GameId: {gameDetails._id}</p>
                <p className="details">  Player One: {gameDetails?.starter?.userName} </p>
                <p className="details">  Player two: {gameDetails?.joiner?.userName} </p>
                <p className="details">  Winner: {gameDetails?.winner?.userName || 'No Winnner Yet'} </p>
            </div>

            <div>

                <ButtonWithLoader title="Back" onClick={() => history.push('/')} />
            </div>


            <h2 style={{ marginTop: "10%", textAlign: "center", color: "violet" }}>

                <pre style={{ color: "royalblue", fontSize: "35px" }}>
                    {winnerMessage}
                </pre>
                <p>{
                    played.length > 0 && `You already played a ${String(played)}`
                }</p>
                <p>
                    {
                        otherPlayerPlayed && `Other player just played a ${String(otherPlayerGame)}`
                    }
                </p>
                {getUserMessage()}
            </h2>
            <Container>
                <Auth>
                    <div onClick={RollDice} style={getGameStyle()}>
                        {rolling ? (
                            <DiceRolling />
                        ) : (<>
                            <DiceDiv>
                                <Dice number={diceOne} />
                                <Dice number={diceTwo} />
                            </DiceDiv></>

                        )}
                    </div>
                </Auth>
            </Container>
        </div>
    )
}
