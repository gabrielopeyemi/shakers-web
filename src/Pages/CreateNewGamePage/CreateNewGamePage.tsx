import { Alert } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import ButtonWithLoader from '../../Component/ButtonWithLoader/ButtonWithLoader';
import { ToastComponents, ToastUI } from '../../Component/Toast';
import { CreateAGameQuery } from '../../Queries/CreateAGameQueries';
import { Auth, Container, InputDivStyled, InputLabelStyled, InputStyled } from '../main.styles'

export default function CreateNewGamePage() {
    // const dispatch = useDispatch();
    let history = useHistory();
    const [amount, setAmount] = useState<any>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    

    const handleCreateGame = async () =>{
        setIsLoading(true)
        let disk = localStorage.getItem('TOKEN')

        if ( !amount ){
            setIsLoading(false)
            return alert('input your details')
        }
        try{
            const response = await CreateAGameQuery({amount, token: JSON.parse(disk ? disk : '')});
            if(response.data.data.success){
                setIsLoading(false)
                localStorage.setItem('GAMEID', JSON.stringify(response.data.data.data._id));
                return history.push('/waiting-for-team-mate')
            }
        }catch(error: any){
            setIsLoading(false)
            if(!error.response.data.success){
                return alert("Oops! you can't create a new game, it's like you are in a game")
            }
            return alert(error.response.data.error)
        }
    }


    
    return (
        <Container>
            <Auth>
                <h4>Create a game</h4>
                <InputDivStyled>
                    <InputLabelStyled>Password</InputLabelStyled>
                    <InputStyled 
                        type='' 
                        onChange={(e: any) => setAmount(e.target.value)}
                        placeholder={'How much do you want to bet'} 
                        value={amount} 
                    />
                </InputDivStyled>
                <ButtonWithLoader onClick={handleCreateGame} isLoading={isLoading}/>
                
            </Auth>
            <ToastComponents />
        </Container>
    )
}
