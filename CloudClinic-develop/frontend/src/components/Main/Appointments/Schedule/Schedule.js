import React, { useEffect, useContext } from 'react';
import './Schedule.scss';
import Button from '../../../Button/Button';
import moment from 'moment';
import { request } from '../../../AxiosTest/config'; // config.js
import { v4 as uuidv4 } from 'uuid';
import { MessageContext } from '../../../../globalState/index';

const Schedule = ({ user, sessions, setSessions }) => {
  const { setFlashMessage } = useContext(MessageContext);
  // const handleAccept = async () => {
  //   // try {
  //   //   const id
  //   //   const response = await request.post(`sessions/${id}/accept`);
  //   // } catch (e) {}
  // };

  // const handleDecline = async () => {
  //   // try {
  //   // } catch (e) {}
  // };

  const handleAccept = async (id) => {
    try {
      const response = await request.patch(`sessions/${id}/accept`);
      // Handle the response or perform any necessary actions
      console.log(response);
        setFlashMessage({
          message: ` Accepted`,
          type: 'notification',
          icon: 'alert',
        });
    } catch (error) {
      if (error.response) {
        // Request was made and received a response with an error status code
        console.log(error);
        setFlashMessage({
          message: `Something went wrong - ${error.response.data.error}`,
          type: 'error',
          icon: 'alert',
        });
      } else if (error.request) {
        // Request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something else happened while setting up the request
        console.error('Error:', error.message);
      }
    }
  };

  const handleDecline = async (id) => {
    try {
      const response = await request.patch(`sessions/${id}/decline`);
      // Handle the response or perform any necessary actions
      setFlashMessage({
        message: ` Appointment Declined`,
        type: 'notification',
        icon: 'alert',
      });
    } catch (error) {
      if (error.response) {
        // Request was made and received a response with an error status code
        setFlashMessage({
          message: `Something went wrong - ${error.response.data.error}`,
          type: 'error',
          icon: 'alert',
        });
      } else if (error.request) {
        // Request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something else happened while setting up the request
        console.error('Error:', error.message);
      }
    }
  };

  useEffect(() => {
    if (sessions.length === 0) {
      const getSessions = async () => {
        try {
          const response = await request.get('sessions');
          const sorted = response.data.sort((a, b) =>
            moment(a.createDate).isBefore(moment(b.createDate)) ? 1 : -1
          );
          setSessions(sorted);
        } catch (e) {
          if (e.response.status === 404) {
            return null;
          } else {
            setFlashMessage({
              message: `Something went wrong - ${e.response.data.error}`,
              type: 'error',
              icon: 'alert',
            });
            return null;
          }
        }
      };
      getSessions();
    }
  }, []);

  const DoctorSchedule = () => {
    return (
      <div className="schedule-wrapper">
        <ul>
          {sessions.length > 0 ? (
            sessions.map(session => {
              return (
                <li key={uuidv4()}>
                  <div className="session-container">
                    <div className="status">
                      <span>{session.status}</span>
                    </div>
                    <div className="client-wrapper">
                      <div className="client">
                        <img
                          className="avatar"
                          src={session.user.profileImage}
                          alt=""
                        />
                      </div>
                      <div className="middle">
                        <div className="name">{`${session.user.firstName} ${session.user.lastName}`}</div>
                        <div className="booking">
                          {`${moment(session.startTime).format(
                            'ddd Do MMM hh:mm'
                          )} - ${moment(session.endTime).format('hh:mm A')}`}
                        </div>
                      </div>
                      <div className="process">
                        <Button
                          action="accept"
                          color="pink"
                          onClick={() => handleAccept(session._id)}
                        />
                        <Button
                          action="decline"
                          color="dark"
                          onClick={() => handleDecline(session._id)}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <div className="session-container">
              <h3 className="no-appointments">No appointments scheduled</h3>
            </div>
          )}
        </ul>
      </div>
    );
  };

  const ClientSchedule = () => {
    return (
      <div className="schedule-wrapper">
        <ul>
          {sessions.length > 0 ? (
            sessions.map(session => {
              return (
                <li key={uuidv4()}>
                  <div className="session-container">
                    <div className="status">
                      <span>{session.status}</span>
                    </div>
                    <div className="client-wrapper">
                      <div className="client">
                        <img
                          className="avatar"
                          src={session.user.profileImage}
                          alt=""
                        />
                      </div>
                      <div className="middle">
                        <div className="name">{`Dr. ${session.user.firstName} ${session.user.lastName}`}</div>
                        <div className="booking">
                          {`${moment(session.startTime).format(
                            'ddd Do MMM hh:mm'
                          )} - ${moment(session.endTime).format('hh:mm A')}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <div className="session-container">
              <h3 className="no-appointments">No appointments scheduled</h3>
            </div>
          )}
        </ul>
      </div>
    );
  };

  const showSchedule = () => {
    return user.isDoctor ? DoctorSchedule() : ClientSchedule();
  };
  return showSchedule();
};

export default Schedule;
