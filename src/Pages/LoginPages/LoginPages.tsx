import { Alert } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import ButtonWithLoader from '../../Component/ButtonWithLoader/ButtonWithLoader';
import { ToastComponents, ToastUI } from '../../Component/Toast';
import { LoginQuery } from '../../Queries/LoginQueries';
import { Auth, Container, InputDivStyled, InputLabelStyled, InputStyled } from '../main.styles'

export default function LoginPages() {
    // const dispatch = useDispatch();
    const [username, setUsername] = React.useState<string>('gabriel');
    const [password, setPassword] = React.useState<string>('Opeyemi@12');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);


    const handleSignIn = async () =>{
        setIsLoading(true)

        if (!username || !password ){
            setIsLoading(false)
            // return ToastAndroid.showWithGravity('input your details', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }
        try{
            const response = await LoginQuery({username, password});
            if(response.data.data.success){
                setIsLoading(false)
                console.log({response: response.data.data.data})
                localStorage.setItem('USERDETAILS', JSON.stringify(response.data.data.data.userDetails));
                localStorage.setItem('ISLOGGIN', JSON.stringify(response.data.data.data.loggedIn));
                localStorage.setItem('TOKEN', JSON.stringify(response.data.data.data.token));
            }
        }catch(error: any){
            setIsLoading(false)
            // ToastUI({
            //     type: 'error',
            //     message: error.data.error,
            //   });
            console.log({error: error})
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
                        onClick={(e: any) => setUsername(e.target.value)}
                    />
                </InputDivStyled>
                <InputDivStyled>
                    <InputLabelStyled>Password</InputLabelStyled>
                    <InputStyled 
                        type='password' 
                        value={password} 
                        onClick={(e: any) => setPassword(e.target.value)}
                    />
                </InputDivStyled>
                <ButtonWithLoader onClick={handleSignIn} isLoading={isLoading}/>
                
            </Auth>
            <ToastComponents />
        </Container>
    )
}
