/**
 * Created by abdelmon on 8/4/2017.
 */

import
    React, {
    Component
}
    from
        'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity, Switch, AsyncStorage
} from 'react-native';
import {Button} from 'native-base';
import {
    Container,
    Content,
    Header,
    Left,
    Body,
    Grid,
    Col, CheckBox,
    Row,
    Right,
    Form,
    Item,
    Input,
    Icon,
    Title,
    StyleProvider, List, ListItem, Card, CardItem,
} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';

import axios from 'axios'
import PageOne from './LoginComponent'
import $ from 'jquery';
import getTheme from '../native-base-theme/components';
import Modal from 'react-native-modalbox';
var moment = require('moment');
import Spinner from 'react-native-loading-spinner-overlay';

export default class HomeComponent extends Component {

    static navigationOptions = {
        title:"El-Gam'eya",
        header: null
    }


    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isDisabled: false,
            isDateTimePickerVisible: false,
            selectedStartDate: "",
            selectedEndDate: "",
            noOfMembers: "",
            cycleTotalAmount: "",
            cycleName: "",
            visible: false,
            cyclePrivacy: false,
            renderedCycles: [],
            amountForSearch: "",
            returnedCycles: [],
            getAll: false

        }
    }

    _showDateTimePicker = (type) => this.setState({isDateTimePickerVisible: true, StartOrEnd: type});

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    _handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        console.log(moment(date).format("YYYY-MM"))
        if (this.state.StartOrEnd === "start") {
            this.setState({selectedStartDate: moment(date).format("YYYY-MM")})

        }
        else {
            this.setState({selectedEndDate: moment(date).format("YYYY-MM")})

        }
        this._hideDateTimePicker();
    };

    handleCancel = () => {
        this.refs.modal3.close();
    }

    submitCycleCreation = () => {
        if (this.state.selectedStartDate == "" || this.state.selectedEndDate == "" || this.state.noOfMembers == ""
            || this.state.cycleName == "" || this.state.cycleTotalAmount == "") {

            alert("please enter all fields")

        }
        else {
            let cycleData = {}
            this.setState({visible: true})
            cycleData =
                {
                    CYCLE_NAME: this.state.cycleName,
                    NUMBER_OF_MEMBERS: this.state.noOfMembers,
                    TOTAL_AMOUNT: this.state.cycleTotalAmount,
                    startDate: this.state.selectedStartDate,
                    endDate: this.state.selectedEndDate,
                    privacy: this.state.cyclePrivacy
                }
            console.log(JSON.stringify(cycleData))

            axios({
                method: "POST",
                url: "http://www.gamieya.somee.com/api/gamieya/CreateCycle",
                data: JSON.stringify(cycleData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((resp) => {
                    this.setState({visible: false});
                    console.log(resp)
                    this.refs.modal3.close()
                    alert("Cycle created successfully")
                })
                .catch((err) => {
                    console.log(err)
                    alert("Unexpected error");
                    this.setState({visible: false});

                })


        }
    }

    searchForCycle = () => {


    }

    handleCancelSearchModal = () => {
        this.refs.modalSearch.close();
    }

    submitSearchCycle = () => {

        if ((this.state.selectedEndDate == "" || this.state.selectedStartDate == "" || this.state.amountForSearch == "") && this.state.getAll === false) {
            alert("please enter all fields");
        }

        else {

            let methodtype = "POST";
            let url = "GetCycle"

            if (this.state.getAll === true) {
                methodtype = "GET"
                url = "GetCycles"
            }
            let searchData = {}
            this.setState({visible: true})
            searchData =
                {
                    startDate: this.state.selectedStartDate,
                    endDate: this.state.selectedEndDate,
                    TOTAL_AMOUNT: this.state.amountForSearch

                }


            console.log(JSON.stringify(searchData))
            searchData = JSON.stringify(searchData);
            if (this.state.getAll === true) {
                searchData = null
            }

            axios({
                method: methodtype,
                url: "http://www.gamieya.somee.com/api/gamieya/" + url,
                data: searchData,
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((resp) => {
                    this.setState({visible: false, returnedCycles: resp.data});
                    console.log(resp)

                    this.refs.modalSearch.close();
                    this.setState({visible: true})


                    setTimeout(() => {

                        this.refs.modal2.open();
                        this.setState({visible: false})


                    }, 2000)

                    // alert("Logged in successfully");

                })
                .catch((err) => {
                    alert("Unexpected error");
                    this.setState({visible: false});

                })
        }


    }

    openCyclesModal = () => {

        let renderedListOfCycles = [];

        if (this.state.returnedCycles.length > 0) {
            for (let x = 0; x < this.state.returnedCycles.length; x++) {
                renderedListOfCycles.push(
                    <Card key={x}>
                        <CardItem header>
                            <Text>{this.state.returnedCycles[x].cyclE_NAME}</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>
                                startDate : {this.state.returnedCycles[x].startDate}
                            </Text>
                            <Text>endDate : {this.state.returnedCycles[x].endDate}</Text>
                            <Text>Number of members : {this.state.returnedCycles[x].numbeR_OF_MEMBERS}</Text>
                            <Button onPress={()=>{
                                this.handleCycleJoin(this.state.returnedCycles[x])
                            }}>
                                <Text>Join</Text>
                            </Button>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Text> amount : {this.state.returnedCycles[x].totaL_AMOUNT}</Text>
                        </CardItem>
                    </Card>
                )
            }


            this.setState({renderedCycles: renderedListOfCycles})

        }

    }

    handleCycleJoin = (data) => {

        debugger;


    }

    handleOpenMyCycles = () => {

this.doGetMyCycles();
    }

    doGetMyCycles=()=>{
        debugger;
        let component = this;
        let renderedData = [];
        let id = component.props.navigation.state.params.id;


        let userData = {
            id: id
        }

        axios({
            method: "POST",
            url: "http://www.gamieya.somee.com/api/gamieya/GetMyCycles",
            data: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((resp) => {

                if (resp.data.length>0) {
                    debugger;

                    for (let x = 0; x < resp.data.length; x++) {
                        renderedData.push(
                            <Card key={x}>
                                <CardItem header>
                                    <Text>{resp.data[x].cyclE_NAME}</Text>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                    <Text>
                                        startDate : {resp.data[x].startDate}
                                    </Text>
                                    <Text>endDate : {resp.data[x].endDate}</Text>
                                    <Text>Number of members : {resp.data[x].numbeR_OF_MEMBERS}</Text>

                                    </Body>
                                </CardItem>
                                <CardItem footer>
                                    <Text> amount : {resp.data[x].totaL_AMOUNT}</Text>
                                </CardItem>
                            </Card>
                        )
                    }

                }
                this.setState({returnedMyCycles:renderedData})
            })
            .catch((err) => {
                console.log(err)
                alert("Unexpected error");

            })

    }

    render() {

        return (
            <Container>

                <Content>
                    <Spinner visible={this.state.visible} textContent={"Loading..."} textStyle={{color: '#FFF'}}/>

                    <Header>
                        <Body>
                        <Title>El-Gam'eya</Title>
                        </Body>
                    </Header>
                    <List>

                        <ListItem itemDivider>
                            <Text>Cycles</Text>
                        </ListItem>
                        <ListItem icon onPress={() => this.refs.modal3.open()}>
                            <Left>
                                <Icon name="plane"/>
                            </Left>
                            <Body>
                            <Text>Create Cycle</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem icon onPress={() => {
                            this.refs.modalSearch.open();
                        }}>
                            <Left>
                                <Icon name="plane"/>
                            </Left>
                            <Body>
                            <Text>Join Cycle</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem icon onPress={() => {
                            this.refs.myCycles.open();
                        }}>
                            <Left>
                                <Icon name="plane"/>
                            </Left>
                            <Body>
                            <Text>My Cycle</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Activity</Text>
                        </ListItem>
                        <ListItem icon onPress={()=>{this.refs.inviteModal.open()}}>
                            <Left>
                                <Icon name="plane"/>
                            </Left>
                            <Body>
                            <Text>Invite</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="plane"/>
                            </Left>
                            <Body>
                            <Text>Follow</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>
                    </List>


                </Content>

                <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"}
                       isDisabled={this.state.isDisabled}>
                    <Grid>
                        <Row style={{height: 20}}>
                            <Col></Col>
                            <Col><Text>Create Cycle</Text></Col>
                            <Col></Col>
                        </Row>
                        <Row style={{height: 30}}>

                            <Col>
                                <Button priamry onPress={() => {
                                    this._showDateTimePicker("start")
                                }}>
                                    <Text>select start Date</Text>
                                </Button>

                            </Col>
                            <Col><Text>{this.state.selectedStartDate}</Text></Col>
                        </Row>
                        <Row style={{height: 20}}></Row>
                        <Row style={{height: 30}}>
                            <Col>
                                <Button priamry onPress={() => {
                                    this._showDateTimePicker("end")
                                }}>
                                    <Text>select end Date</Text>
                                </Button>
                            </Col>
                            <Col><Text>{this.state.selectedEndDate}</Text></Col>

                        </Row>
                        <Row style={{height: 200}}>
                            <Col>
                                <Form>
                                    <Item>
                                        <Input value={this.state.noOfMembers}
                                               onChangeText={(text) => {
                                                   text = text.replace(/[^0-9]/g, '');
                                                   this.setState({noOfMembers: text})
                                               }}
                                               placeholder="Number Of Members"/>
                                    </Item>
                                    <Item>
                                        <Input value={this.state.cycleName}
                                               onChangeText={(text) => {
                                                   this.setState({cycleName: text})
                                               }}
                                               placeholder="Cycle Name"/>
                                    </Item>
                                    <Item>
                                        <Input value={this.state.cycleTotalAmount}
                                               onChangeText={(text) => {
                                                   text = text.replace(/[^0-9]/g, '');

                                                   this.setState({cycleTotalAmount: text})
                                               }}
                                               placeholder="Cycle Total Amount"/>
                                    </Item>
                                </Form>

                            </Col>

                        </Row>
                        <Row style={{height: 40}}>
                            <Col>
                                <List>
                                    <ListItem icon>
                                        <Left>
                                            <Icon name="plane"/>
                                        </Left>
                                        <Body>
                                        <Text>Privacy</Text>
                                        </Body>
                                        <Right>
                                            <Switch onValueChange={(val) => {
                                                this.setState({cyclePrivacy: !this.state.cyclePrivacy})
                                            }} value={this.state.cyclePrivacy}/>
                                        </Right>
                                    </ListItem>
                                </List>
                            </Col>
                        </Row>
                        <Row style={{height: 20}}>
                            <Col>
                                <Button
                                    onPress={this.handleCancel}
                                ><Text>cancel</Text></Button>
                            </Col>
                            <Col>
                                <Button onPress={this.submitCycleCreation}>
                                    <Text>
                                        Submit
                                    </Text>
                                </Button>
                            </Col>
                        </Row>

                    </Grid>
                </Modal>
                <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal2"} swipeToClose={false}
                       isDisabled={this.state.isDisabled} onOpened={this.openCyclesModal}>
                    <Container>
                        <Content>
                            {this.state.renderedCycles}
                        </Content>
                    </Container>

                </Modal>
                <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"myCycles"} swipeToClose={false}
                       isDisabled={this.state.isDisabled} onOpened={this.handleOpenMyCycles}>
                    <Container>
                        <Content>
                            {this.state.returnedMyCycles}
                        </Content>
                    </Container>
                </Modal>

                <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"inviteModal"} swipeToClose={false}
                       isDisabled={this.state.isDisabled}>
                    <Container>
                        <Content>
                            <Text>Invite via : </Text>
                            <Text>whatsapp</Text>
                            <Text>facebook</Text>
                            <Text>gmail</Text>
                            <Text>twitter</Text>
                        </Content>
                    </Container>
                </Modal>

                <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modalSearch"}
                       swipeToClose={false}
                       isDisabled={this.state.isDisabled}>
                    <Container>
                        <Content>
                            <Grid>
                                <Row style={{height: 20}}>
                                    <Col></Col>
                                    <Col><Text>Join Cycle</Text></Col>
                                    <Col></Col>
                                </Row>
                                <Row style={{height: 30}}>
                                    <Col>
                                        <Button priamry onPress={() => {
                                            this._showDateTimePicker("start")
                                        }}>
                                            <Text>select start month</Text>
                                        </Button>
                                    </Col>
                                    <Col><Text>{this.state.selectedStartDate}</Text></Col>
                                </Row>
                                <Row style={{height: 20}}></Row>
                                <Row style={{height: 30}}>
                                    <Col>
                                        <Button priamry onPress={() => {
                                            this._showDateTimePicker("end")
                                        }}><Text>select end month</Text>
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Text>{this.state.selectedEndDate}</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Text> Amounts : </Text>
                                    </Col>
                                    <Col><Input onChangeText={(text) => {
                                        text = text.replace(/[^0-9]/g, '');
                                        this.setState({amountForSearch: text})
                                    }} placeholder="amount"/></Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Text>Get all cycles</Text>
                                    </Col>
                                    <Col>
                                        <CheckBox onPress={() => {
                                            this.setState({getAll: !this.state.getAll})

                                        }} checked={this.state.getAll}/>
                                    </Col>
                                </Row>
                                <Row style={{height: 40}}>
                                    <Col>
                                        <Button
                                            onPress={this.handleCancelSearchModal}>
                                            <Text>cancel</Text>
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button onPress={this.submitSearchCycle}>
                                            <Text>
                                                Submit
                                            </Text>
                                        </Button>
                                    </Col>
                                </Row>
                            </Grid>
                        </Content>
                    </Container>

                </Modal>


                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={(date) => {
                        this._handleDatePicked(date)
                    }}
                    onCancel={this._hideDateTimePicker}
                />
            </Container>


        )
    }

}


const styles = StyleSheet.create({

    wrapper: {},

    modal: {
        /* justifyContent: 'center',
         alignItems: 'center'*/
        backgroundColor: "#E6E6E6",
        padding: 10
    },


    modal3: {
        height: 600,
        width: 320
    }

});