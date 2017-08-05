/**
 * Created by abdelmon on 8/2/2017.
 */


import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text, Image,
    View
} from 'react-native';
import {Button} from 'native-base'
import {
    Container,
    Content,
    Header,
    Left,
    Body,
    Grid,
    Col,
    Row,
    Right,
    Form,
    Item,
    Input,
    Icon,
    Title,
    StyleProvider
} from 'native-base';

import axios from 'axios'
import PageOne from './LoginComponent'
import Spinner from 'react-native-loading-spinner-overlay';
import $ from 'jquery';
import getTheme from '../native-base-theme/components';

export default class RegisterationComponent extends Component {

    static navigationOptions = {
        title: "El-Gam'eya",
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            fullname: "",
            email: "",
            password: "",
            mobile: ""
        }
        this.handleSignUpClick = this.handleSignUpClick.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleSignUpClick() {

        if (this.state.fullname == "" || this.state.email == "" || this.state.mobile == "" || this.state.password == "") {
            alert("please enter all fields")
        }
        else {
            let userData = {}
            this.setState({visible: true})
            userData =
                {
                    full_name: this.state.fullname,
                    email: this.state.email,
                    password: this.state.password,
                    mobile: this.state.mobile
                }
            console.log(JSON.stringify(userData))

            axios({
                method: "POST",
                url: "http://www.gamieya.somee.com/api/gamieya/RegisterUser",
                data: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((resp) => {
                    this.setState({visible: false});
                    console.log(resp)
                    alert("Registeration completed successfully")
                })
                .catch((err) => {
                    console.log(err)
                    alert("Unexpected error");
                    this.setState({visible: false});

                })
        }
    }

    handleLoginClick() {
        const {navigate} = this.props.navigation;
        navigate("LoginPage");
    }

    render() {


        return (
            <StyleProvider style={getTheme()}>
                <Container>
                    <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>

                    <Content>
                        <Header>
                            <Body>
                            <Title>El-Gam'eya</Title>
                            </Body>
                        </Header>
                        <Grid>
                            <Row style={{height:20}}></Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Image  style={{height:100,width:100}}
                                        source={require('../imgs/gamieya.png')}
                                    /></Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                    <Form>
                                        <Item>
                                            <Input value={this.state.fullname}
                                                   onChangeText={(text) => {
                                                       text = text.replace(/[^a-zA-Z]/g, '');
                                                       this.setState({fullname: text})
                                                   }}
                                                   placeholder="Full name"/>
                                        </Item>
                                        <Item last>
                                            <Input
                                                value={this.state.email}
                                                onChangeText={(text) => {
                                                    this.setState({email: text})
                                                }}
                                                placeholder="E-mail"/>
                                        </Item>
                                        <Item last>
                                            <Input
                                                value={this.state.password}
                                                onChangeText={(text) => {
                                                    this.setState({password: text})
                                                }}
                                                secureTextEntry={true}
                                                placeholder="Password"/>
                                        </Item>
                                        <Item last>
                                            <Input
                                                value={this.state.mobile}
                                                onChangeText={(text) => {
                                                    text = text.replace(/[^0-9]/g, '');
                                                    this.setState({mobile: text})
                                                }}
                                                placeholder="Mobile"/>
                                        </Item>
                                    </Form>
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row style={{height: 20}}></Row>
                            <Row >
                                <Col></Col>
                                <Col>
                                    <Button priamry onPress={this.handleSignUpClick}>
                                        <Text>Sign up</Text>
                                    </Button>
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row style={{height: 20}}></Row>
                            <Row >
                                <Col></Col>
                                <Col>
                                    <Button priamry onPress={this.handleLoginClick}>
                                        <Text>Sign in</Text>
                                    </Button>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Grid>


                    </Content>
                </Container>
            </StyleProvider>

        )
    }


}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#F5FCFF'
    }
});
