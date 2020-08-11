import React, {Component} from 'react';
import "react-perfect-scrollbar/dist/css/styles.css";
import {Table, Card, CardBody, CardTitle, Button} from "reactstrap";
import './t-streaming.css'
import {Link} from 'react-router-dom'
import picklelogo from '../../assets/img/logo/Pickle_Logo.png'
import io from 'socket.io-client'


const teacherStreamingTypes = {REQUEST: "teacherScreen/REQUEST"}
const teacherStreamingRequest = (action) => ({type: teacherStreamingTypes.REQUEST, payload: action.payload})
export const teacherStreamingReducer = ( state = {}, action ) => {
    switch (action.type){
        case teacherStreamingTypes.REQUEST: return {...state, payload: action.payload}
        default: return state
    }
}

export class TeacherStreaming extends Component{ //필요한것... 수업코드, 학생코드, 선생코드, 수업디테일이 일단 들어왔다고 생각하자.
    constructor(props) {
        super(props);
        this.state = {
            lectureMeterialList :  [{seq : 1,fistName : "현대문학의 이해", lastName : "수정/삭제"},{seq : 2,fistName : "고전문학의 이해", lastName : "수정/삭제"},{seq : 3,fistName : "근대문학의 이해", lastName : "수정/삭제"}],
            studentList :  [{seq : 1,fistName : "030501", lastName : "Mary"},{seq : 2,fistName : "030502", lastName : "Carrie"},{seq : 3,fistName : "030503", lastName : "Dorothy"}
                ,{seq : 4,fistName : "030504", lastName : "Helen"},{seq : 5,fistName : "030505", lastName : "Carol"},{seq : 6,fistName : "030506", lastName : "Betty"},{seq : 7,fistName : "030507", lastName : "Sally"}
                ,{seq : 8,fistName : "030508", lastName : "Susan"},{seq : 9,fistName : "030509", lastName : "Shirley"},{seq : 10,fistName : "030510", lastName : "Diane"},{seq : 11,fistName : "030511", lastName : "Anna"},
                {seq : 12,fistName : "030512", lastName : "Elizabeth"},{seq : 13,fistName : "030513", lastName : "Margaret"},{seq : 14,fistName : "030514", lastName : "Clara"}
                ,{seq : 15,fistName : "030515", lastName : "Annie"},{seq : 16,fistName : "030516", lastName : "Grace"},{seq : 17,fistName : "030517", lastName : "Nancy"},
                {seq : 18,fistName : "030518", lastName : "Frank"},{seq : 19,fistName : "030519", lastName : "Dennis"},{seq : 20,fistName : "030520", lastName : "Donald"},
                {seq : 21,fistName : "030521", lastName : "Athur"},{seq : 22,fistName : "030522", lastName : "Edward"},{seq : 23,fistName : "030523", lastName : "Harry"},
                {seq : 24,fistName : "030524", lastName : "Peter"},{seq : 25,fistName : "030525", lastName : "Richard"}],
            videoProps : [{poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 1,fistName : "030501", lastName : "Mary"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 2,fistName : "030502", lastName : "Carrie"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 3,fistName : "030503", lastName : "Dorothy"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 4,fistName : "030504", lastName : "Helen"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 5,fistName : "030505", lastName : "Carol"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 6,fistName : "030506", lastName : "Betty"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 7,fistName : "030507", lastName : "Sally"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 8,fistName : "030508", lastName : "Susan"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 9,fistName : "030509", lastName : "Shirley"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 10,fistName : "030510", lastName : "Diane"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 11,fistName : "030511", lastName : "Anna"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info: {seq : 12,fistName : "030512", lastName : "Elizabeth"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 13,fistName : "030513", lastName : "Margaret"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 14,fistName : "030514", lastName : "Clara"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 15,fistName : "030515", lastName : "Annie"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 16,fistName : "030516", lastName : "Grace"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 17,fistName : "030517", lastName : "Nancy"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info: {seq : 18,fistName : "030518", lastName : "Frank"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 19,fistName : "030519", lastName : "Dennis"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 20,fistName : "030520", lastName : "Donald"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info: {seq : 21,fistName : "030521", lastName : "Athur"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 22,fistName : "030522", lastName : "Edward"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 23,fistName : "030523", lastName : "Harry"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info: {seq : 24,fistName : "030524", lastName : "Peter"}},
                {poster: "https://thumbs.gfycat.com/AdoredDeafeningFox-size_restricted.gif", info:{seq : 25,fistName : "030525", lastName : "Richard"}}],
            nowPageProps : [],
            nowPage : 0,
            noPrev : false,
            noNext : false,
            peer1: null,
            peer2: null,
            localStream: null,
            remoteStream1 : null,
            remoteStream2 : null,
            pcConfig : {'iceServers' : [{urls: 'stun:stun.l.google.com:19302'},
                    {urls:  'turn:numb.viagenie.ca', credential : "muazkh", username : "webrtc@live.com"}]},
            count : 0,
            classCode : "Kor112",
            teacherCode :"T111223"
        }
        this.localVideoRef = React.createRef();
        this.remoteVideoRef1 = React.createRef();
        this.remoteVideoRef2 = React.createRef();
        this.socket = io.connect('https://secret-dawn-11778.herokuapp.com/')
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
        this.offer = this.offer.bind(this)
        this.handleNewICECandidateMsg = this.handleNewICECandidateMsg.bind(this)
    }

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({video : true})
            .then(stream=>{
                this.localVideoRef.current.srcObject = stream;
                this.setState({localStream: stream})
            })
        this.setState({nowPageProps:  this.state.videoProps.slice(0,6)})


        this.socket.emit('joinRoom', {roomName : this.state.classCode, code: this.state.teacherCode}) //state에 저장된 classCode와 teacherCode가 서버로 보내진다.


        this.socket.on('letOffer',data=>{
            console.log('receive start offer message from server')
            this.offer(data)
        })
        this.socket.on('recAnswer', message=>{
            if(message.target ==="???") {
                let {peer1} = this.state
                peer1.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(r =>
                    console.log(`remoteDescription setting success`))
                this.setState({peer1})
            }else if (message.target === "???"){
                let {peer2} = this.state
                peer2.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(()=>
                    console.log(`remoteDescription setting success`))
                this.setState({peer2})
            }
        })
        this.socket.on('recCandidate', message=>{
            if(message.target ==="???") {
                const {peer1} = this.state
                peer1.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                    console.log('success icecandidate added'))
                    .catch(e=>console.log(e))
            }else if(message.target ==="???"){
                const {peer2} = this.state
                peer2.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                    console.log('success icecandidate added'))
                    .catch(e=>console.log(e))
            }
            })

    }
    offer(data){
        let {localStream, count} = this.state
        console.log("offer")
        count++
        switch (count) {
            case 0:
                let {peer1} = this.state
                peer1 = new RTCPeerConnection(this.state.config)
                localStream.getTracks().forEach(track => peer1.addTrack(track,localStream))
                peer1.onicecandidate =  e => {
                if (e.candidate){
                    this.sendMessage({
                        type : "candidate",
                        target : data.studentId,
                        candidate : e.candidate
                    })
                }
            }
                peer1.ontrack = e=>  {
                console.log('remote stream added on track')
                if (e.streams[0]){
                    this.remoteVideoRef1.current.srcObject =e.streams[0]
                }
            }
                peer1.createOffer().then(offer=>{
                    peer1.setLocalDescription(offer)
                        .then(()=>{
                            console.log("peer1 set local description success")
                        })
                })
                    .then(()=>{
                        this.sendMessage({
                            name : data.teacherId,
                            target :data.studentId,
                            type : "offer",
                            sdp : peer1.localDescription
                        })
                    })
                break;
            case 1:
                let {peer2} = this.state
                peer2 = new RTCPeerConnection(this.state.config)
                localStream.getTracks().forEach(track => peer2.addTrack(track,localStream))
                peer2.onicecandidate = e => {
                    if (e.candidate){
                        this.sendMessage({
                            type : "candidate",
                            target : data.studentId,
                            candidate : e.candidate
                        })
                    }
                }
                peer2.ontrack = e=>{
                    console.log('remote stream added on track')
                    if (e.streams[0]){
                        this.remoteVideoRef2.current.srcObject =e.streams[0]
                    }
                }
                peer2.createOffer().then(offer=>{
                    peer2.setLocalDescription(offer)
                        .then(()=>{
                            console.log("peer1 set local description success")
                        })
                })
                    .then(()=>{
                        this.sendMessage({
                            name : data.teacherId,
                            target :data.studentId,
                            type : "offer",
                            sdp : peer2.localDescription
                        })
                    })
        }
    }

    nextPage(){
       this.setState({nowPageProps :  this.state.videoProps.slice((this.state.nowPage+1)*6,(this.state.nowPage+1)*6+6),nowPage : this.state.nowPage+1})
    }
    prevPage(){
        this.setState({nowPageProps :  this.state.videoProps.slice((this.state.nowPage-1)*6,(this.state.nowPage-1)*6+6), nowPage : this.state.nowPage-1})
    }
    handleNewICECandidateMsg(message){
        console.log(`addicecandidate ${message.target}`)
            let {peer} = this.state
        peer.addIceCandidate(new RTCIceCandidate(message.candidate)).then(r =>
                console.log('success icecandidate added'))
                .catch(e=>console.log(e))
    }


    render() {
        return (
            <>
                <div style={{textAlign : "center"}}>
                </div>
                <button onClick={this.call} disabled={this.state.callDisabled}>
                    Call{" "}
                </button>{" "}
                <table className="t-streaming-student-video"> <tr>
                    {this.state.nowPage!==0 ?
                       <td><Button disabled={false} onClick={this.prevPage}>이전</Button></td>:<td><Button disabled={true} onClick={this.prevPage}>이전</Button></td>
                    }
                    {this.state.nowPageProps.map(props=>{
                        return (<td> <Card><p className="t-streaming-student-name">학번 : {props.info.fistName} 이름 : {props.info.lastName}</p></Card>
                            <video className="t-streaming-student-video-component" poster={props.poster} ref={this.remoteVideoRef} autoPlay/></td>)
                        })}
                    {this.state.nowPage!==4 ?
                        <td><Button disabled={false} onClick={this.nextPage}>다음</Button></td>:<td><Button disabled={true} onClick={this.nextPage}>다음</Button></td>
                    }

                       </tr>
                </table>

                <div className="t-streaming-container">
                    <div className="t-streaming-streaming-container">
                        <div className="t-streaming-video-container" >
                            <video ref={this.localVideoRef} className="t-streaming-video-component" autoPlay controls/>
                            <div className="t-streaming-comment-container">
                                <Card>
                                    <p>4월 2주차 월요일 1교시 문학<br/>1차시 : 현대 문학의 이해</p>
                                </Card></div>
                        </div>
                    </div>
                    <div className="t-streaming-items-container">
                        <div className="t-streaming-member-list-container">
                            <Card>
                                <CardTitle className="t-streaming-member-list-title">멤버 리스트</CardTitle>
                                <CardBody>
                                    <div style={{ width: "100%",
                                        height: "550px",
                                        overflow: "auto",
                                        margin: "auto"}}>
                                        <Table responsive className="t-streaming-member-list-table">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>학번</th>
                                                <th>이름</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.studentList && this.state.studentList.map(student=><tr>
                                                <th scope="row">{student.seq}</th>
                                                <td>{student.fistName}</td>
                                                <td>{student.lastName}</td>
                                            </tr>)}
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="t-streaming-lecture-meterials-container">
                            <Card>
                                <CardTitle  className="t-streaming-lecture-meterials-title">강의자료</CardTitle>
                                <CardBody>
                                    <div style={{ width: "100%",
                                        height: "80px",
                                        overflow: "auto",
                                        margin: "auto"}}>
                                        <Table  size="sm" className="t-streaming-lecture-meterials-table">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>파일명</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.lectureMeterialList && this.state.lectureMeterialList.map(lectureMeterial=><tr>
                                                <th scope="row">{lectureMeterial.seq}</th>
                                                <td>{lectureMeterial.fistName}</td>
                                                <td>{lectureMeterial.lastName}</td>
                                            </tr>)}
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>

                </div>

            </>
        );
    }
}

export default teacherStreamingReducer;