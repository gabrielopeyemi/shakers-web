import React, { ReactElement } from 'react';
import One from './../../assets/dices/one.jpg';
import Two from './../../assets/dices/two.jpg';
import Three from './../../assets/dices/three.jpg';
import Four from './../../assets/dices/four.jpg';
import Five from './../../assets/dices/five.jpg';
import Six from './../../assets/dices/six.jpg';
import { DiceImage } from './Dice.style';

interface Props {
    number: any
}



export default function Dice({number}: Props): ReactElement {
    if (number == 1){
        return (
            <DiceImage src={One} alt='One'/>
        )
      }
      if (number == 2){
        return (
            <DiceImage src={Two} alt='Two'/>
        )
      }
      if (number == 3){
        return (
            <DiceImage src={Three} alt='Three'/>
        )
      }
      if (number == 4){
        return (
            <DiceImage src={Four} alt='Four'/>
        )
      }
      if (number == 5){
        return (
            <DiceImage src={Five} alt='Five'/>
        )
      }
      if (number == 6){
        return (
            <DiceImage src={Six} alt='Six'/>
        )
      }
    return <DiceImage src={One} alt={One} />
}
