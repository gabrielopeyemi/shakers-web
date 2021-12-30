import { Alert } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ButtonWithLoader from '../../Component/ButtonWithLoader/ButtonWithLoader';
import { ToastComponents, ToastUI } from '../../Component/Toast';
import { CheckIfUserIsInAGameQuery } from '../../Queries/CheckIfUserIsInAGameQuery';
import { LoginQuery } from '../../Queries/LoginQueries';
import { Auth, Container, InputDivStyled, InputLabelStyled, InputStyled } from '../main.styles'

export default function LoginPages() {
    // const dispatch = useDispatch();
    let history = useHistory();
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const CheckIfUserIsInAGame = async (token: string) =>{
        
        try{
            const response = await CheckIfUserIsInAGameQuery(token);
            const main = response.data.data
            if(main.success){
                if(main.data === null){
                    return history.push('/dashboard')
                }

                if(main.data.joiner === undefined){
                    return history.push('/waiting-for-team-mate');
                }
                history.push('/play-ground')
                return;
            }
        }catch(error){
           
        }
    }


    const handleSignIn = async () =>{
        const GameRunning = localStorage.getItem('GAMEID');
        setIsLoading(true)

        if (!username || !password ){
            setIsLoading(false)
            return alert('field is empty')
        }
        try{
            const response = await LoginQuery({username, password});
            if(response.data.data.success){
                setIsLoading(false)
                localStorage.setItem('USERDETAILS', JSON.stringify(response.data.data.data.userDetails));
                localStorage.setItem('ISLOGGIN', JSON.stringify(response.data.data.data.loggedIn));
                localStorage.setItem('TOKEN', JSON.stringify(response.data.data.data.token));
                if(!GameRunning){
                    return history.push('/dashboard')
                }
                return CheckIfUserIsInAGame(response.data.data.data.token)
                
            }
        }catch(error: any){
            setIsLoading(false)
            alert(error.response.data.error)
        }
    }

    return (
        <Container>
            <Auth>
                <h4>Login to Shakers</h4>
                <InputDivStyled>
                    <InputLabelStyled>Username</InputLabelStyled>
                    <InputStyled 
                        type='text' 
                        value={username} 
                        onChange={(e: any) => setUsername(e.target.value)}
                    />
                </InputDivStyled>
                <InputDivStyled>
                    <InputLabelStyled>Password</InputLabelStyled>
                    <InputStyled 
                        type='password' 
                        value={password} 
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                </InputDivStyled>
                <ButtonWithLoader onClick={handleSignIn} isLoading={isLoading}/>
                
            </Auth>
            <ToastComponents />
        </Container>
    )
}
