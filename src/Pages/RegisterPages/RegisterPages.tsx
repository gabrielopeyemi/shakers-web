import React, { ReactElement } from 'react'
import { ToastContainer } from 'react-toastify';
import ButtonWithLoader from '../../Component/ButtonWithLoader/ButtonWithLoader'
import { ToastComponents, ToastUI } from '../../Component/Toast';
import { CreateQueries } from '../../Queries/CreateQueries';
import { Auth, Container, InputDivStyled, InputLabelStyled, InputStyled } from '../main.styles'

interface Props {
    
}

export default function RegisterPages({}: Props): ReactElement {
    const [username, setUsername] = React.useState<string>('gabriel');
    const [password, setPassword] = React.useState<string>('Opeyemi@12');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleRegister = async () =>{
        setIsLoading(true)

        if (!username || !password ){
            setIsLoading(false)
            return 
        }
        try{
            const response = await CreateQueries({userName: username, password});
            if(response.data.data.success){
                setIsLoading(false)
                localStorage.setItem('USERDETAILS', JSON.stringify(response.data.data.data.userDetails));
                localStorage.setItem('ISLOGGIN', JSON.stringify(response.data.data.data.loggedIn));
                localStorage.setItem('TOKEN', JSON.stringify(response.data.data.data.token));

            }
        }catch(error: any){
            setIsLoading(false)
            // ToastUI({
            //     type: 'error',
            //     message: error.response.data.error,
            //   });
            alert(error.response.data.error)
            return ;
        }
    }
    return (
        <Container>
        <Auth>
            <h4>Register to Shakers</h4>
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
            <ButtonWithLoader onClick={handleRegister} isLoading={isLoading}/>
        </Auth>
        {/* <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        /> */}
    </Container>
    )
}
