import React, { ReactElement } from 'react';
import IMAGE from './../../assets/GIF/diceloading.gif'

interface Props {
    
}

export default function DiceRolling({}: Props): ReactElement {
    return (
        <div>
            <img src={IMAGE} alt='roll-dice' />
        </div>
    )
}
