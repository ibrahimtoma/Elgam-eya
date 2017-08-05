/**
 * Created by abdelmon on 8/2/2017.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,Image
} from 'react-native';
import {
    Button,
    Grid,
    Col,
    Row,
    Form,
} from 'native-base'
import axios from 'axios'
import {StackNavigator} from 'react-navigation';
import {Container, Header, Content, Input,Body,Title, Item, StyleProvider, Card, CardItem, Icon, Right} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';


export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            visible: false
        };

        this.handleLoginPress = this.handleLoginPress.bind(this);
    }

    static navigationOptions = {
        title: "Login",
        header: null
    }

    handleLoginPress() {
        const {navigate} = this.props.navigation;

        if (this.state.email == "" || this.state.password == "") {
            alert("please enter all fields");
        }
        else {
            this.setState({visible: true})

            let userData = {}
            this.setState({visible: true})
            userData =
                {
                    email: this.state.email,
                    password: this.state.password,
                }
            console.log(JSON.stringify(userData))

            axios({
                method: "POST",
                url: "http://www.gamieya.somee.com/api/gamieya/LoginUser",
                data: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((resp) => {
                    this.setState({visible: false});
                    console.log(resp)
                    AsyncStorage.setItem('userData', {id:resp.data.user.id});
                    navigate("HomePage",resp.data.user);

                })
                .catch((err) => {
                    alert("Unexpected error");
                    this.setState({visible: false});

                })


        }


    }


    render() {


        return (
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
                                <Image style={{height:100,width:100}}
                                    source={require('../imgs/gamieya.png')}
                                /></Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col>

                                <Form>
                                    <Item>
                                        <Input value={this.state.email}
                                               onChangeText={(text) => {
                                                   this.setState({email: text})
                                               }}
                                               placeholder="email"/>
                                    </Item>
                                    <Item>
                                        <Input value={this.state.password}
                                               onChangeText={(text) => {
                                                   this.setState({password: text})
                                               }}
                                               secureTextEntry={true}
                                               placeholder="password"/>
                                    </Item>
                                </Form>


                            </Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col>
                                <Button priamry onPress={this.handleLoginPress}>
                                    <Text>Login</Text>
                                </Button>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Grid>


                </Content>
            </Container>
        )
    }

}