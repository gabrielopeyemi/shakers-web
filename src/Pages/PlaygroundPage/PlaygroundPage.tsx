import React, { ReactElement, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ButtonWithLoader from '../../Component/ButtonWithLoader/ButtonWithLoader'
import Dice from '../../Component/Dice/Dice';
import DiceRolling from '../../Component/Dice/DiceRolling';
import { ToastComponents, ToastUI } from '../../Component/Toast';
import { CreateQueries } from '../../Queries/CreateQueries';
import { Auth, Container, InputDivStyled, InputLabelStyled, InputStyled } from '../main.styles';
import IMAGE from './../../assets/GIF/diceloading.gif'
import { DiceDiv } from './PlaygroundPage.style';

interface Props {
    
}

export default function PlaygroundPage({}: Props): ReactElement {
    let history = useHistory();
    const [diceOne, setDiceOne] = useState<number>(1);
    const [diceTwo, setDiceTwo] = useState<number>(1);
    const [rolling, setRolling] = useState(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    const getNewNumber = () =>{
        return Math.floor(Math.random() * 6) + 1
    };

    const RollDice = () =>{
        setRolling(true);
        let a = getNewNumber()
        let b = getNewNumber()
        setDiceTwo(a);
        setDiceOne(b);
        setTimeout(()=> {
            let sum = a +  b;
                setRolling(false)
                return;
        }, 2000)
    };


    return (
        <div>
            <div>
                Hello
            </div>
            <Container>
                <Auth>
                    <div onClick={RollDice}>
                        {rolling ? (
                            <DiceRolling />
                        ):(
                            <DiceDiv>
                                <Dice number={diceOne} />
                                <Dice number={diceTwo} />
                            </DiceDiv>
                        )}
                    </div>  
                </Auth>
            </Container>
        </div>
    )
}
