import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ButtonWithLoader from '../../Component/ButtonWithLoader/ButtonWithLoader'
import { ToastComponents, ToastUI } from '../../Component/Toast';
import { CreateQueries } from '../../Queries/CreateQueries';
import { Auth, Container, InputDivStyled, InputLabelStyled, InputStyled } from '../main.styles'

interface Props {

}

export default function RegisterPages({ }: Props): ReactElement {
    const history = useHistory();
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleRegister = async () => {
        setIsLoading(true)

        if (!username || !password) {
            setIsLoading(false)
            return
        }
        try {
            const response = await CreateQueries({ userName: username, password });
            if (response.data.data.success) {
                setIsLoading(false)
                localStorage.setItem('USERDETAILS', JSON.stringify(response.data.data.data.userDetails));
                localStorage.setItem('ISLOGGIN', JSON.stringify(response.data.data.data.loggedIn));
                localStorage.setItem('TOKEN', JSON.stringify(response.data.data.data.token));
            }
            history.push('/running-games');
        } catch (error: any) {
            setIsLoading(false);
            alert(error.response.data.error)
            return;
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
                <ButtonWithLoader title="register" onClick={handleRegister} isLoading={isLoading} />
                <ButtonWithLoader title="login" onClick={() => history.push('/')} isLoading={isLoading} />
            </Auth>
        </Container>
    )
}
