import React, { ReactElement } from 'react'
import ButtonWithLoader from '../../Component/ButtonWithLoader/ButtonWithLoader'
import { Auth, Container, InputDivStyled, InputLabelStyled, InputStyled } from '../main.styles'

interface Props {
    
}

export default function RegisterPages({}: Props): ReactElement {
    return (
        <Container>
            <Auth>
                <h4>Register on Shakers</h4>
                <InputDivStyled>
                    <InputLabelStyled>username</InputLabelStyled>
                    <InputStyled type='text' />
                </InputDivStyled>
                <InputDivStyled>
                    <InputLabelStyled>password</InputLabelStyled>
                    <InputStyled type='password' />
                </InputDivStyled>
                <ButtonWithLoader />
            </Auth>
        </Container>
    )
}
