import "./ManageWorkers.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
    allWorkers,
    deleteSaProfile,
    manageWorkersData
} from "../../services/apiCalls";
import { userData } from '../userSlice';
import { CustomInput } from "../../common/CustomInput/CustomInput";
import { validator } from "../../services/useful";

export const ManageWorkers = () => {
    const userDataRdx = useSelector(userData)
    const token = userDataRdx.credentials
    const role = userDataRdx.role
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')
    const [successfully, setSuccessfully] = useState('')
    const [isEnabled, setIsEnabled] = useState(true)
    const [workerList, setWorkerList] = useState([])
    const [selectedWorker, setSelectedWorker] = useState(null)
    const [workerStateOfComponent, setWorkerStateOfComponent] = useState(0)


    useEffect(() => {
        if (!token && role === 'superAdmin') {
            navigate('/')
        }
    }, [token, role])

    const [worker, setWorker] = useState({
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
        specialty: '',
        picture: ''
    })

    const [workerError, setWorkerError] = useState({
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
        specialtyError: '',
        pictureError: ''
    })

    const functionHandler = (e) => {
        setWorker((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const errorCheck = (e) => {
        let error = '';
        error = validator(e.target.name, e.target.value)
        setWorkerError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error,
        }))
    }

    const clearError = (e) => {
        setWorkerError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: '',
        }))
    }

    useEffect(() => {
        const WorkerProfileData = async () => {
            try {
                const response = await allWorkers(token)
                setWorkerList(response.data.data)
            } catch (error) {
                setErrorMsg(error.response.data.message)
            }
        }
        WorkerProfileData()
    }, [token, workerStateOfComponent])

    const findWorkerById = (workerId) => {
        return workerList.find((worker) => worker.id === workerId)
    }

    const handleWorkerSelection = (e) => {
        const selectedWorkerId = parseInt(e.target.value, 10)
        const selectedWorker = findWorkerById(selectedWorkerId)

        setSelectedWorker(selectedWorker)

        setWorker({
            name: selectedWorker.name,
            lastName: selectedWorker.lastName,
            documentId: selectedWorker.documentId,
            phone: selectedWorker.phone,
            email: selectedWorker.email,
            street: selectedWorker.street,
            door: selectedWorker.door,
            zipCode: selectedWorker.zipCode,
            town: selectedWorker.town,
            country: selectedWorker.country,
            specialty: selectedWorker.specialty,
            picture: selectedWorker.picture
        })
    }

    const updateWorkerData = async () => {
        if (worker.name === '' || worker.lastName === '' ||
            worker.phone === '' || worker.email === '' ||
            worker.documentId === '' || worker.country === '' ||
            worker.street === '' || worker.door === '' ||
            worker.zipCode === '' || worker.town === '' ||
            worker.specialty === '' || worker.picture === '') {
            return
        }

        try {
            const body = {
                id: selectedWorker.id,
                name: worker.name,
                lastName: worker.lastName,
                phone: worker.phone,
                email: worker.email,
                documentId: worker.documentId,
                street: worker.street,
                door: worker.door,
                zipCode: worker.zipCode,
                town: worker.town,
                country: worker.country,
                specialty: worker.specialty,
                picture: worker.picture
            }

            const response = await manageWorkersData(token, body)
            setWorkerStateOfComponent((state) => state + 1)
            setWorker(response.data.data)
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
            const response = await allWorkers(token)
            setWorker(response.data.data)

        } catch (error) {
            setErrorMsg(error.response.data.message)
        }
    }

    const deleteUser = async () => {
        try {

            const id = parseInt(selectedWorker.id)
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


    return (
        <div className="superAdminManageWorkersDesign">
            <div className="titleManageWorkers">Manage Workers</div>
            <div className="cardSaWorkersDesign">
                <div className="profileWorkerSelected">
                    <div className="dataWorkerSelected">
                        <div className="inputsEditDesign">
                            <div className="pictureWorker">
                                <img className="pictureWorker" src={worker.picture} alt="worker" />
                            </div>
                            <div className="spaceBetweenButtons"></div>
                            <select
                                className="selectWorkers"
                                onChange={handleWorkerSelection}
                                value={selectedWorker ? selectedWorker.id : ""}
                            >
                                <option value="">Select a worker</option>
                                {workerList.map((worker) => (
                                    <option key={worker.id} value={worker.id}>
                                        {`${worker.name} ${worker.lastName}`}
                                    </option>
                                ))}
                            </select>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'name'}
                                name={'name'}
                                placeholder={'name'}
                                value={worker.name}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />

                            <div className='MsgError'>{workerError.nameError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'lastName'}
                                name={'lastName'}
                                placeholder={'lastName'}
                                value={worker.lastName}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{workerError.lastNameError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'phone'}
                                name={'phone'}
                                placeholder={'phone'}
                                value={worker.phone}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{workerError.phoneError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'email'}
                                name={'email'}
                                placeholder={'email'}
                                value={worker.email}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{workerError.emailError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'documentId'}
                                name={'documentId'}
                                placeholder={'documentId'}
                                value={worker.documentId}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{workerError.documentIdError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'street'}
                                name={'street'}
                                placeholder={'street'}
                                value={worker.street}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{workerError.streetError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'door'}
                                name={'door'}
                                placeholder={'door'}
                                value={worker.door}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{workerError.doorError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'zipCode'}
                                name={'zipCode'}
                                placeholder={'zipCode'}
                                value={worker.zipCode}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{workerError.zipCodeError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'town'}
                                name={'town'}
                                placeholder={'town'}
                                value={worker.town}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{workerError.townError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'country'}
                                name={'country'}
                                placeholder={'country'}
                                value={worker.country}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{workerError.countryError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'specialty'}
                                name={'specialty'}
                                placeholder={'specialty'}
                                value={worker.specialty}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{workerError.specialtyError}</div>
                            <CustomInput
                                disabled={isEnabled}
                                design={'inputDesign'}
                                type={'picture'}
                                name={'picture'}
                                placeholder={'Insert picture direction'}
                                value={worker.picture}
                                functionProp={functionHandler}
                                functionBlur={errorCheck}
                                functionFocus={clearError}
                            />
                            <div className='MsgError'>{workerError.pictureError}</div>
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
                                            <div className="manageWorkerButton"
                                                onClick={() => cancelEditData()}>Cancel</div>
                                            <div className="spaceBetweenButtons"></div>
                                            <div className="manageWorkerButton"
                                                onClick={() => updateWorkerData()}>Send</div>
                                            <div className='errorMsg'>{errorMsg}</div>
                                        </>
                                    )
                            }
                        </div>
                    </div>
                    <div className="buttonsManageWorkerDesign">
                        <div className="buttonBed"
                            onClick={() => setIsEnabled(!isEnabled)}>Edit profile</div>
                        <div className="buttonBedDelete"
                            onClick={() => deleteUser()}>Delete</div>
                    </div>
                </div>
            </div>
        </div>

    )

}
