import React from 'react';

import SystemMessageContainer from './components/Chatbox/MessageContainer/SystemMessageContainer/SystemMessageContainer';
import SeperatingTime from './components/Chatbox/MessageContainer/SeperatingTime/SeperatingTime';
import RHSMessageContainer from './components/Chatbox/MessageContainer/RHSMessageContainer/RHSMessageContainer';
import LHSMessageContainer from './components/Chatbox/MessageContainer/LHSMessageContainer/LHSMessageContainer';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const TIMEGAP = 3*SECOND;

export const getOfflineTime = (offlineMoment) => {
    const now = new Date();
    const diff = now.getTime() - new Date(offlineMoment).getTime();

    if (diff < HOUR) return (parseInt(diff / MINUTE, 10) + 1).toString() + 'min';
    else if (diff < 24 * HOUR) return (parseInt(diff / HOUR, 10) + 1).toString() + 'hour';
    else if (diff < 7 * DAY) return (parseInt(diff / DAY, 10) + 1).toString() + 'day';
    else return '';
}


export const seperateMessages = (messages, RHSName, avatarUrl) => {
    if (messages.length < 1) return [];

    let retArr = [];
    let tempLeft = [];
    let tempRight = [];
    let tempMid = [];

    let key = 0;

    if (messages[0].from === RHSName) {
        retArr.push(<SeperatingTime key={'st.' + key + '.-1'} time={messages[0].time} />);
        tempRight.push(messages[0]);
    } else if (messages[0].from === 'system') {
        retArr.push(<SeperatingTime key={'st.' + key + '.-1'} time={messages[0].time} />);
        tempMid.push(messages[0]);
    } else {
        retArr.push(<SeperatingTime key={'st.' + key + '.-1'} time={messages[0].time} />);
        tempLeft.push(messages[0]);
    }
    
    for (var i = 1; i < messages.length; i++) {
        if (messages[i].from === 'system') {
            if (tempLeft.length > 0) {
                if (key > 0 && messages[key].time - messages[key - 1].time > TIMEGAP) {
                    retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
                }

                let tempArr = [tempLeft[0]];
                let subKey = 0;
                for (let j = 1; j < tempLeft.length; j++) {
                    if (tempLeft[j].time - tempLeft[j - 1].time > TIMEGAP) {
                        retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} avatarUrl={avatarUrl}/>);
                        retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey}  id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                        tempArr = [];
                        subKey = j;
                    }
                    tempArr.push(tempLeft[j]);
                }

                if (tempArr.length !== 0) {
                    retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} avatarUrl={avatarUrl}/>);
                }
        
                tempLeft = [];
                key = i;
            } else if (tempRight.length > 0) {
                if (key > 0 && messages[key].time - messages[key - 1].time > TIMEGAP) {
                    retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
                }

                let tempArr = [tempRight[0]];
                let subKey = 0;
                for (let j = 1; j < tempRight.length; j++) {
                    if (tempRight[j].time - tempRight[j - 1].time > TIMEGAP) {
                        retArr.push(<RHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} avatarUrl={avatarUrl}/>);
                        retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey}  id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                        tempArr = [];
                        subKey = j;
                    }
                    tempArr.push(tempRight[j]);
                }

                if (tempArr.length !== 0) {
                    retArr.push(<RHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} avatarUrl={avatarUrl}/>);
                }
        
                tempRight = [];
                key = i;
            } 

            tempMid.push(messages[i]);
        } else if (messages[i].from === RHSName) {
            if (tempLeft.length > 0)  {
                if (key > 0 && messages[key].time - messages[key - 1].time > TIMEGAP) {
                    retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
                }
                let tempArr = [tempLeft[0]];
                let subKey = 0;
                for (let j = 1; j < tempLeft.length; j++) {
                    if (tempLeft[j].time - tempLeft[j - 1].time > TIMEGAP) {
                        retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} avatarUrl={avatarUrl}/>);
                        retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey}  id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                        tempArr = [];
                        subKey = j;
                    }
                    tempArr.push(tempLeft[j]);
                }
        
                if (tempArr.length !== 0) {
                    retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} avatarUrl={avatarUrl}/>);
                }
        
                tempLeft = [];
                key = i;
            } else if (tempMid.length > 0) {
                    if (key > 0 && messages[key].time - messages[key - 1].time > TIMEGAP) {
                    retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
                }
                let tempArr = [tempMid[0]];
                let subKey = 0;
                for (let j = 1; j < tempMid.length; j++) {
                    if (tempMid[j].time - tempMid[j - 1].time > TIMEGAP) {
                        retArr.push(<SystemMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                        retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey}  id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                        tempArr = [];
                        subKey = j;
                    }
                    tempArr.push(tempMid[j]);
                }
        
                if (tempArr.length !== 0) {
                    retArr.push(<SystemMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                }
        
                tempMid = [];
                key = i;
            }

            tempRight.push({ ...messages[i] });
        } else {
            if (tempRight.length > 0) {
                if (key > 0 && messages[key].time - messages[key - 1].time > TIMEGAP) {
                    retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
                }
                let tempArr = [tempRight[0]];
                let subKey = 0;
                for (let j = 1; j < tempRight.length; j++) {
                    if (tempRight[j].time - tempRight[j - 1].time > TIMEGAP) {
                        retArr.push(<RHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                        retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey} id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                        tempArr = [];
                        subKey = j;
                    }
                    tempArr.push(tempRight[j]);
                }
        
                if (tempArr.length !== 0) {
                    retArr.push(<RHSMessageContainer messages={tempArr} key={key + '.' +subKey} id={key + '.' +subKey}  />);
                }
        
                tempRight = [];
                key = i;
            } else if (tempMid.length > 0) {
                if (key > 0 && messages[key].time - messages[key - 1].time > TIMEGAP) {
                    retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
                }
                let tempArr = [tempMid[0]];
                let subKey = 0;
                for (let j = 1; j < tempMid.length; j++) {
                    if (tempMid[j].time - tempMid[j - 1].time > TIMEGAP) {
                        retArr.push(<SystemMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                        retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey}  id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                        tempArr = [];
                        subKey = j;
                    }
                    tempArr.push(tempMid[j]);
                }
        
                if (tempArr.length !== 0) {
                    retArr.push(<SystemMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                }
        
                tempMid = [];
                key = i;
            }

            tempLeft.push({ ...messages[i] });
        }
    }
    

    i--;

    if (tempLeft.length >0) {
        if (key > 1 && messages[key].time - messages[key - 1].time > TIMEGAP) {
            retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
        }
        let tempArr = [tempLeft[0]];

        let subKey = 0;
        for (let j = 1; j < tempLeft.length; j++) {
            if (tempLeft[j].time - tempLeft[j - 1].time > TIMEGAP) {
                retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} avatarUrl={avatarUrl} />);
                retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey}  id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                tempArr = [];
                subKey = j;
            }
            tempArr.push(tempLeft[j]);
        }

        if (tempArr.length !== 0) {
            retArr.push(<LHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} avatarUrl={avatarUrl} />);
            key++;
        }
    }

    if (tempRight.length > 0) {
        if (key > 1 && messages[key].time - messages[key - 1].time > TIMEGAP) {
            retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
        }
        let tempArr = [tempRight[0]];
        let subKey = 0;
        for (let j = 1; j < tempRight.length; j++) {
            if (tempRight[j].time - tempRight[j- 1].time > TIMEGAP) {
                retArr.push(<RHSMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey} id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                tempArr = [];
                subKey = j;
            }
            tempArr.push(tempRight[j]);
        }

        if (tempArr.length !== 0) {
            retArr.push(<RHSMessageContainer messages={tempArr} key={key + '.' +subKey} id={key + '.' +subKey}  />);
            key++;
        }
    }

    if (tempMid.length > 0) {
        if (key > 1 && messages[i].time - messages[key - 1].time > TIMEGAP) {
            retArr.push(<SeperatingTime key={'st.' + key + '.'} time={messages[key].time} />);
        }
        let tempArr = [tempMid[0]];
        let subKey = 0;
        for (let j = 1; j < tempMid.length; j++) {
            if (tempMid[j].time - tempMid[j- 1].time > TIMEGAP) {
                retArr.push(<SystemMessageContainer messages={tempArr} key={key + '.' + subKey} id={key + '.' + subKey} />);
                retArr.push(<SeperatingTime key={'st.' + key + '.' + subKey} id={'st.' + key + '.' + subKey}  time={messages[key + j].time} />);
                tempArr = [];
                subKey = j;
            }
            tempArr.push(tempMid[j]);
        }

        if (tempArr.length !== 0) {
            retArr.push(<SystemMessageContainer messages={tempArr} key={key + '.' +subKey} id={key + '.' +subKey}  />);
            key++;
        }
    }

    return retArr;
}