import React from "react";
import './TeacherRegistration.css';


function TeacherRegistration(){
    return(
        <div className="teacher-Reg">
            <form action="post" className="teacher-Reg-board">
                <fieldset>
                    <legend>Bio-data</legend>

                    <div className="Teachers-infor-container">
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
                                <label htmlFor="first-name">First Name</label>
                                <input type="text" id="first-name" required placeholder="First Name"/>
                            </div>
                            <div className="Teachers-input-container">
                                <label htmlFor="last-name">Last Name</label>
                                <input type="text" id="last-name" required placeholder="last Name"/>
                            </div>

                        </div> 
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
                                <label htmlFor="other-name">Other name</label>
                                <input type="text" id="other-name"  placeholder="Other Name"/>
                            </div>

                            <div className="Teachers-input-container">
                                <label htmlFor="gender">Gender</label>
                                <select name="" id="gender" required>
                                    <option value="">--Select--</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>

                        <div className="Teachers-infor">
                            <div className="Teachers-input-container">
                                <label htmlFor="DOB">Date of Birth</label>
                                <input type="date" id="DOB" required />
                            </div>

                            <div className="Teachers-input-container">
                                <label htmlFor="nin">National Id No. (NIN)</label>
                                <input type="text" id="nin" placeholder="National ID No." minLength={14} maxLength={14}/>
                            </div>
                        </div>

                        <div className="Teachers-infor">
                            <div className="Teachers-input-container">
                                <label htmlFor="reli">Religion</label>
                                <input type="text" id="reli" required placeholder="Religion"/>
                                <p></p>
                            </div>

                            <div className="Teachers-input-container">
                                <label htmlFor="nin">Disability (If any)</label>
                                <input type="text" id="" placeholder=""/>
                            </div>
                        </div>
                        
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Contact-information</legend>
                    <div className="Teachers-infor-container">
                        
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
                                <label htmlFor="home">Home Address</label>
                                <input type="text" id="home" required placeholder="Home Address"/>
                            </div>
                            <div className="Teachers-input-container">
                                <label htmlFor="district">District</label>
                                <input type="text" id="district" required placeholder="District"/>
                            </div>

                        </div> 
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
                                <label htmlFor="county">County</label>
                                <input type="text" id="county" required placeholder="County"/>
                            </div>
                            <div className="Teachers-input-container">
                                <label htmlFor="sub-county">Sub-county</label>
                                <input type="text" id="sub-county" required placeholder="Sub-county"/>
                            </div>

                        </div>
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
                                <label htmlFor="parish">Parish</label>
                                <input type="text" id="parish" required placeholder="Parish"/>
                            </div>
                            <div className="Teachers-input-container">
                                <label htmlFor="village">Village</label>
                                <input type="text" id="village" required placeholder="Village"/>
                            </div>

                        </div> 
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
                                <label htmlFor="phone-number">Phone-number</label>
                                <input type="text" id="phone-number" required placeholder="Phone-number"/>
                            </div>
                            <div className="Teachers-input-container">
                                <label htmlFor="email">Email(if any)</label>
                                <input type="text" id="email" required placeholder="Email"/>
                            </div>

                        </div>  
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Professional information </legend>
                    <div className="Teachers-infor-container">
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
                                <label htmlFor="Employee-ID">Employee ID</label>
                                <input type="text" id="parents-name" required placeholder="TCH-001"/>
                            </div>
                            <div className="Teachers-input-container">
                                <label htmlFor="department">Department</label>
                                <select name="" id="department" required>
                                    <option value="">select</option>
                                    <option value="">Computer science dept</option>
                                    <option value="">Engineering dept</option>
                                    <option value="">Education dept</option>
                                    <option value="">Accounting dept</option>
                                </select>
                            </div>

                        </div>
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
                                <label htmlFor="subject">Subject</label>
                                <select name="" id="subject" required>
                                    <option value="">select</option>
                                    <option value="">Programming</option>
                                    <option value="">Business computing</option>
                                    <option value="">Economics</option>
                                    <option value="">Decrete Math</option>
                                </select>
                            </div>
                            <div className="Teachers-input-container">
                                <label htmlFor="qualification">Highest Qualification</label>
                                <select name="" id="relationship" required>
                                    <option value="">select</option>
                                    <option value="">Degree/Bachelors</option>
                                    <option value="">Higher Diploma</option>
                                    <option value="">Diploma</option>
                                    <option value="">Certificate</option>
                                </select>
                            </div>

                        </div>
                        <div className="Teachers-infor">

                            <div className="Teachers-input-container">
                                <label htmlFor="years">Years of Experience</label>
                                <input type="text" id="years" required placeholder=""/>
                            </div>
                            <div className="Teachers-input-container">
                                <label htmlFor="date">Join Date</label>
                                <input type="date" id="date" required placeholder=""/>
                            </div>

                        </div> 
                    </div>
                </fieldset>
                <div className="register-btnn">
                    <div></div>
                    <div className="teacher-register-btn">
                        <div className="teacher-register-btn01">
                            <button>Clear Form</button>
                        </div>
                        <div className="teacher-register-btn02">
                            <button>Register Teacher</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default TeacherRegistration;