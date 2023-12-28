import "./ManageUsers.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
    allUsers,
    changeRoleUser,
    deleteSaProfile,
    manageUsersData
} from "../../services/apiCalls";
import { userData } from '../userSlice';
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";

export const ManageUsers = () => {
    const userDataRdx = useSelector(userData)
    const token = userDataRdx.credentials
    const role = userDataRdx.role
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')
    const [successfully, setSuccessfully] = useState('')
    const [isEnabled, setIsEnabled] = useState(true)
    const [userList, setUserList] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [userStateOfComponent, setUserStateOfComponent] = useState(0)

    useEffect(() => {
        if (!token && role === 'superAdmin') {
            navigate('/')
        }
    }, [token, role])

    const [user, setUser] = useState({
        name: '',
        lastName: '',
        documentId: '',
        phone: '',
        email: '',
        street: '',
        door: '',
        zipCode: '',
        town: '',
        country: '',
        picture: '',
        role: ''
    })

    const [userError, setUserError] = useState({
        nameError: '',
        lastNameError: '',
        documentIdError: '',
        phoneError: '',
        emailError: '',
        streetError: '',
        doorError: '',
        zipCodeError: '',
        townError: '',
        countryError: '',
        pictureError: '',
        roleError: ''
    })

    const functionHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const errorCheck = (e) => {
        let error = '';
        error = validator(e.target.name, e.target.value)
        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }))
    }

    const clearError = (e) => {
        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: '',
        }))
    }

    useEffect(() => {
        const userProfileData = async () => {
            try {
                const response = await allUsers(token)
                setUserList(response.data.data)
            } catch (error) {
                setErrorMsg(error.response.data.message)
            }
        }
        userProfileData()
    }, [token, userStateOfComponent])

    const findUserById = (userId) => {
        return userList.find((user) => user.id === userId)
    }

    const handleUserSelection = (e) => {
        const selectedUserId = parseInt(e.target.value, 10)
        const selectedUser = findUserById(selectedUserId)

        setSelectedUser(selectedUser)

        setUser({
            name: selectedUser.name,
            lastName: selectedUser.lastName,
            documentId: selectedUser.documentId,
            phone: selectedUser.phone,
            email: selectedUser.email,
            street: selectedUser.street,
            door: selectedUser.door,
            zipCode: selectedUser.zipCode,
            town: selectedUser.town,
            country: selectedUser.country,
            picture: selectedUser.picture,
            role: selectedUser.role
        })
    }

    const updateUserData = async () => {
        if (user.name === '' || user.lastName === '' ||
            user.phone === '' || user.email === '' ||
            user.documentId === '' || user.country === '' ||
            user.street === '' || user.door === '' ||
            user.zipCode === '' || user.town === '') {
            return
        }

        try {
            const body = {
                id: selectedUser.id,
                name: user.name,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                documentId: user.documentId,
                street: user.street,
                door: user.door,
                zipCode: user.zipCode,
                town: user.town,
                country: user.country,
                picture: user.picture
            }

            const response = await manageUsersData(token, body)
            setUserStateOfComponent((state) => state + 1)
            setUser(response.data.data)
            setIsEnabled(true)
            setSuccessfully(response.data.message)

            setTimeout(() => {
                setSuccessfully('')
            }, 1000)

        } catch (error) {
            setErrorMsg(error.response.data.message)
        }
    }

    const cancelEditData = async () => {
        setIsEnabled(true)
        try {
            const response = await allUsers(token)
            setUser(response.data.data)

        } catch (error) {
            setErrorMsg(error.response.data.message)
        }
    }

    const deleteUser = async () => {
        if (isEnabled !== true) {
            return
        }
        try {
            const id = parseInt(selectedUser.id)
            const response = await deleteSaProfile(id, token)
            if (response.status === 200) {
                setSuccessfully(response.data.message)

                setTimeout(() => {
                    setSuccessfully('')
                }, 1000)
            }

        } catch (error) {
            setErrorMsg(error.response.data.message)
        }
    }

    const changeRole = async () => {
        if (isEnabled !== true) {
            return
        }
        try {
            const body = {
                id: parseInt(selectedUser.id),
                role: user.role,
            }

            const response = await changeRoleUser(token, body)
            setUserStateOfComponent((state) => state + 1)
            setUser(response.data.data)
            setIsEnabled(true)
            setSuccessfully(response.data.message)

            setTimeout(() => {
                setSuccessfully('')
            }, 1000)

        } catch (error) {
            setErrorMsg(error.response.data.message)
        }
    }


    return (
        <div className="superAdminManageUsersDesign">
            <div className="titleManageUsers">Manage Users</div>
            <div className="cardSaUsersDesign">
                <div className="profileUserSelected">
                    <div className="dataUserSelected">
                        <div className="inputsToEditDesign">
                            <div className="pictureUser">
                                <img className="pictureUser" src={user.picture} alt="user" />
                            </div>
                            <div className="spaceBetweenButtons"></div>
                            <select
                                className="selectUsers"
                                onChange={handleUserSelection}
                                value={selectedUser ? selectedUser.id : ""}
                            >
                                <option value="">Select a User</option>
                                {userList.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {`${user.name} ${user.lastName}`}
                                    </option>
                                ))}
                            </select>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'name'}
                                name={'name'}
                                placeholder={'name'}
                                value={user.name}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{userError.nameError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'lastName'}
                                name={'lastName'}
                                placeholder={'lastName'}
                                value={user.lastName}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{userError.lastNameError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'phone'}
                                name={'phone'}
                                placeholder={'phone'}
                                value={user.phone}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{userError.phoneError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'email'}
                                name={'email'}
                                placeholder={'email'}
                                value={user.email}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{userError.emailError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'documentId'}
                                name={'documentId'}
                                placeholder={'documentId'}
                                value={user.documentId}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{userError.documentIdError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'street'}
                                name={'street'}
                                placeholder={'street'}
                                value={user.street}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{userError.streetError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'door'}
                                name={'door'}
                                placeholder={'door'}
                                value={user.door}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{userError.doorError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'zipCode'}
                                name={'zipCode'}
                                placeholder={'zipCode'}
                                value={user.zipCode}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{userError.zipCodeError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'town'}
                                name={'town'}
                                placeholder={'town'}
                                value={user.town}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{userError.townError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'country'}
                                name={'country'}
                                placeholder={'country'}
                                value={user.country}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{userError.countryError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'picture'}
                                name={'picture'}
                                placeholder={'Insert picture direction'}
                                value={user.picture}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{userError.pictureError}</div>
                            <div className="changeRoleUser">
                                <CustomInput
                                    disabled={!isEnabled}
                                    design={'inputDesign'}
                                    type={'role'}
                                    name={'role'}
                                    placeholder={'Change role'}
                                    value={user.role}
                                    functionProp={functionHandler}
                                    functionBlur={errorCheck}
                                    functionFocus={clearError}
                                />
                            </div>
                            <div className='MsgError'>{userError.roleError}</div>
                            {
                                isEnabled
                                    ? (
                                        <>
                                            <div className="spaceBetweenButtons"></div>
                                            <div className='successfully'>{successfully}</div>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <div className="cancelButton"
                                                onClick={() => cancelEditData()}>Cancel</div>
                                            <div className="spaceBetweenButtons"></div>
                                            <div className="sendButton"
                                                onClick={() => updateUserData()}>Send</div>
                                            <div className='errorMsg'>{errorMsg}</div>
                                        </>
                                    )
                            }
                        </div>
                    </div>
                    <div className="buttonsManageUserDesign">
                        <div className="buttonBottomBed"
                            onClick={() => setIsEnabled(!isEnabled)}>Edit profile</div>
                        <div className="buttonBottomBedChangeRole"
                            onClick={() => changeRole()}>Change Role</div>
                        <div className="buttonBedDeleteUser"
                            onClick={() => deleteUser()}>Delete</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
