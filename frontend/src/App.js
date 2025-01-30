import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Registration from './pages/Registration';
import Networking from './pages/Networking';
import Privatemessages from './pages/Privatemessages';
import Groupmessages from './pages/Groupmessages';
import Forum from './pages/Forum';
import Opportunities from './pages/Opportunities';
import Opportunities1 from './pages/Opportunities1';
import Resources from './pages/Resources';
import Events from './pages/Events';
import Eventdescription from './pages/Eventdescription';
import Eventregistration from './pages/Eventregistration';
import Contactus from './pages/Contactus';
import CallForPaper from './pages/Callofpaper';
import Homeregistration from './pages/Homeregistration';
import Conference from './pages/conference';
import Resources1 from './pages/Resources1';
import Successstories from './pages/Sucessstories';
import Resourcemp from './pages/Resourcemp';
import Resourcesccp from './pages/Resourceccp';
import Mentorshipcontact from './pages/Mentorshipcontact';
import OtpPage from './pages/OtpPage';
import ForgotPassword from './pages/EmailPage';
import Settings from './pages/Settings';
import ResetPassword from './pages/ResetPassword';
import ForumDiscussion from './pages/ForumDiscussion';


export default function App(){
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Home />}/>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="/privatemessages" element={<Privatemessages />} />
          <Route path="/groupmessages" element={<Groupmessages />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forumdiscussion/:topicId" element={<ForumDiscussion />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/opportunities1" element={<Opportunities1 />} />
          <Route path="/events" element={<Events />} />
          <Route path="/eventdescription" element={<Eventdescription />} />
          <Route path="/eventregistration" element={<Eventregistration />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/callofpaper" element={<CallForPaper />} />
          <Route path="/homeregistration" element={<Homeregistration />} />
          <Route path="/conference" element={<Conference />} />
          <Route path="/emailpage" element={<ForgotPassword />} />
          <Route path="/otppage" element={<OtpPage />} />
          <Route path="/resources1" element={<Resources1 />} />
          <Route path="/successstories" element={<Successstories />} />
          <Route path="/resourcesccp" element={<Resourcesccp />} />
          <Route path="/resourcesemp" element={<Resourcemp />} />
          <Route path="/mentorshipcontact" element={<Mentorshipcontact />} />
          <Route path="/resetpassword" element={<ResetPassword/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


