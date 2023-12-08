import { useEffect, useState } from 'react'
import axios from 'axios';
import { useSignOut } from 'react-auth-kit';
import {useAuthHeader} from 'react-auth-kit'
import { BASE_API_URL } from '../api';
import {useAuthUser} from 'react-auth-kit'
import {useIsAuthenticated} from 'react-auth-kit';
import  { useNavigate } from 'react-router-dom'

function Home() {
    const useSignout = useSignOut();
    const auth = useAuthHeader();
    const authData = useAuthUser();
    const [subjects, setSubjects] = useState<Array<object> | undefined>(undefined);
    const [grades, setGrades] = useState<any | undefined>(undefined);
    const [userToken, setUserToken] = useState<string | undefined>(undefined);
    const [user, setUser] = useState<any | undefined>(undefined);
    const [focusedSubject, setFocusedSubject] = useState<any | undefined>(undefined);

    const [subjectsLecturer, setSubjectsLecturer] = useState<any | undefined>(undefined);
    const [students, setStudents] = useState<any | undefined>(undefined);
    const [gradesForLecturer, setGradesForLecturer] = useState<any | undefined>(undefined);
    const [focusedStudent, setFocusedStudent] = useState<any | undefined>(undefined);


    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
      const raw = auth()
      const userData = authData();

      if(!isAuthenticated()) {
        useSignout()
        navigate("/login");
        return;
      }
      if(userData === null) return;

      const token = raw.replace("Bearer ", '')

      setUser(userData)
      setUserToken(token)

      console.log(userData)

      if(userData.role_id === 1) {
          axios.get(`http://localhost:8080/student/get/subjects`, {
            params: {
              token: token
            }
          }).then((res) => {
            console.log(res.data)
            setSubjects(res.data);
          })
          axios.get(`http://localhost:8080/student/get/group`, {
            params: {
              token: token
            }
          }).then((res) => {
            console.log(res.data[0])
            setUser({...userData, group_name: res.data[0].group_name});
          })
      }
      if(userData.role_id === 2) {
        axios.get(`http://localhost:8080/lecturer/get/subjects`, {
          params: {
            token: token
          }
        }).then((res) => {
          console.log(res.data)
          setSubjectsLecturer(res.data);
        })
    }
    }, [])
    const renderGrades = (subject_id: number, subject: string) => {
      console.log(user)
        axios.get(`http://localhost:8080/student/get/grades`, {
          params: {
            token: userToken,
            subject_id: subject_id
          }
        }).then((res) => {
          console.log({...res.data, subject:subject})
          setFocusedSubject(subject)
          setGrades(res.data);
        })
    }
    const renderStudentGroup = (subject_id: number, study_program_id: number) => {
      console.log(subject_id, study_program_id)
        axios.get(`http://localhost:8080/lecturer/get/studentsInGroup`, {
          params: {
            token: userToken,
            subject_id: subject_id,
            study_program_id: study_program_id
          }
        }).then((res) => {
          console.log(res.data)
          setStudents(res.data)
          //setFocusedSubject(subject)
          //setGrades(res.data);
        })
    }
    const renderGradesForEdit = (student: any) => {
      console.log(student)
        axios.get(`http://localhost:8080/lecturer/get/grades`, {
          params: {
            token: userToken,
            subject_id: student.subject_id,
            student_id: student.id
          }
        }).then((res) => {
          console.log(res.data)
          //setFocusedSubject(subject)
          setGradesForLecturer(res.data);
          setFocusedStudent(student)
        })
    }

  return (
    <div>
      {/* <h1>Home</h1>
      <button onClick={useSignout}>Signout</button> */}

      <div className='flex flex-wrap w-fit'>
        {subjects && <div className='flex basis-full'>
          <p className='px-5 basis-1/5 text-center border-x-neutral-400 border-r-2 pb-5'>Dalyko modulio kodas ir pavadinimas</p>
          <p className='px-5 basis-1/5 text-center border-x-neutral-400 border-r-2 pb-5'>Kreditų skaičius</p>
          <p className='px-5 basis-1/5 text-center border-x-neutral-400 border-r-2 pb-5'>Galutinis įvertinimas</p>
          <p className='px-5 basis-1/5 text-center border-x-neutral-400 border-r-2 pb-5'>Semestras</p>
          <p className='px-5 basis-1/5 text-center pb-5'>Tarpiniai įvertinimai</p>
        </div>}
        { subjects && subjects.map((subject:any) => {
          return (<div className='flex basis-full'>
            <p className='px-5 basis-1/5 text-center border-x-neutral-400 border-r-2 pb-2'>{subject.id}. {subject.subject}</p>
            <p className='px-5 basis-1/5 text-center border-x-neutral-400 border-r-2 pb-2'>{subject.credits}</p>
            <p className='px-5 basis-1/5 text-center border-x-neutral-400 border-r-2 pb-2'>{subject.final_grade}</p>
            <p className='px-5 basis-1/5 text-center border-x-neutral-400 border-r-2 pb-5'>{subject.semester}</p>
            <p onClick={e => renderGrades(subject.id, subject.subject)} className='px-5 basis-1/5 text-center pb-2'><a href='#'>peržiūra</a></p>
          </div>)
        })}
        {grades && <h1 className='basis-full text-center text-3xl pt-5'>{focusedSubject} pažymiai</h1>}
        {grades && <div className='flex basis-full mt-5'>
          <p className='px-5 basis-1/4 text-center border-x-neutral-400 border-r-2 pb-5'>Eil nr.</p>
          <p className='px-5 basis-1/4 text-center border-x-neutral-400 border-r-2 pb-5'>Grupė</p>
          <p className='px-5 basis-1/4 text-center border-x-neutral-400 border-r-2 pb-5'>Vardas pavardė</p>
          {grades && grades.map((grade:any) => {
          return (<p className='px-5 basis-1/4 text-center border-x-neutral-400 border-r-2 pb-5'>{grade.abbreviation}</p>)
        })}
        </div>}
        {grades && <div className='flex basis-full'>
            <p className='px-5 basis-1/4 text-center border-x-neutral-400 border-r-2 pb-2'>{user.id}. {}</p>
            <p className='px-5 basis-1/4 text-center border-x-neutral-400 border-r-2 pb-2'>{user.group_name}</p>
            <p className='px-5 basis-1/4 text-center border-x-neutral-400 border-r-2 pb-2'>{user.first_name}, {user.last_name}</p>
            {grades && grades.map((grade:any) => {
              return (<p className='px-5 basis-1/4 text-center border-x-neutral-400 border-r-2 pb-5'>{grade.grade}</p>)
            })}
          </div>}
        {grades && <div className='basis-full text-center mt-5'>
            {grades && grades.map((grade:any) => {
              return (<p>{grade.abbreviation} = {grade.assignment_type}</p>)
            })}
          </div>}
      </div>
      <div className='flex flex-wrap justify-center'>
            {subjectsLecturer && subjectsLecturer.map((subject: any) => {
                return <div onClick={e => renderStudentGroup(subject.id, subject.study_program_group_id)} className='cursor-pointer border basis-1/4 h-20 m-5 bg-slate-400 flex justify-center items-center'><p className='text-center'>{subject.subject}, {subject.study_program_group}</p></div>
            })}
      </div>

      {students && <div className='flex basis-full justify-center'>
          <p className='px-5 basis-1/5 text-center border-x-neutral-400 border-r-2 pb-5'>Studento kodas</p>
          <p className='px-5 basis-1/5 text-center border-x-neutral-400 border-r-2 pb-5'>Studento vardas ir pavardė</p>
          <p className='px-5 basis-1/5 text-center border-x-neutral-400 border-r-2 pb-5'>Studento grupė</p>
          <p className='px-5 basis-1/5 text-center pb-5'>įvertinimai</p>
        </div>}

      {students && students.map((student: any) => { return <div className='flex basis-full justify-center'>
          <p className='px-5 basis-1/5 text-center border-x-neutral-400 border-r-2 pb-5'>{student.id}</p>
          <p className='px-5 basis-1/5 text-center border-x-neutral-400 border-r-2 pb-5'>{student.first_name} {student.last_name}</p>
          <p className='px-5 basis-1/5 text-center border-x-neutral-400 border-r-2 pb-5'>{student.group_name}</p>
          <p onClick={e => renderGradesForEdit(student)} className='px-5 basis-1/5 text-center pb-5'><a href='#'>įvertinimai</a></p>
        </div> })}

        {gradesForLecturer && <h1 className='basis-full text-center text-3xl pt-5'>{focusedSubject} pažymiai</h1>}
        {gradesForLecturer && <div className='flex basis-full mt-5'>
          <p className='px-5 basis-1/4 text-center border-x-neutral-400 border-r-2 pb-5'>Eil nr.</p>
          <p className='px-5 basis-1/4 text-center border-x-neutral-400 border-r-2 pb-5'>Grupė</p>
          <p className='px-5 basis-1/4 text-center border-x-neutral-400 border-r-2 pb-5'>Vardas pavardė</p>
          {gradesForLecturer && gradesForLecturer.map((grade:any) => {
          return (<p className='px-5 basis-1/4 text-center border-x-neutral-400 border-r-2 pb-5'>{grade.abbreviation}</p>)
        })}
        </div>}
        {gradesForLecturer && <div className='flex basis-full'>
            <p className='px-5 basis-1/4 text-center border-x-neutral-400 border-r-2 pb-2'>{focusedStudent.id}. {}</p>
            <p className='px-5 basis-1/4 text-center border-x-neutral-400 border-r-2 pb-2'>{focusedStudent.group_name}</p>
            <p className='px-5 basis-1/4 text-center border-x-neutral-400 border-r-2 pb-2'>{focusedStudent.first_name}, {focusedStudent.last_name}</p>
            {gradesForLecturer && gradesForLecturer.map((grade:any) => {
              return (<p className='px-5 basis-1/4 text-center border-x-neutral-400 border-r-2 pb-5'>{grade.grade}</p>)
            })}
          </div>}
        {gradesForLecturer && <div className='basis-full text-center mt-5'>
            {gradesForLecturer && gradesForLecturer.map((grade:any) => {
              return (<p>{grade.abbreviation} = {grade.assignment_type}</p>)
            })}
          </div>}

      <div className='flex w-full justify-center'>
      <button className='block bg-blue-500 w-36 h-8 rounded-lg text-sky-950 mt-5' onClick={useSignout}>Atsijungti</button>

      
      </div>
    </div>
  )
}

export default Home
