import supabase from "../config/supabaseClient"
import {useEffect, useState} from 'react'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [users,setUsers] = useState(null)
  
  useEffect(()=>{
    const fetchUsers = async () => {
      const {data,error} = await supabase
        .from('users')
        .select()
      if(error){
        setFetchError('could not fetch users')
        console.log(error);
        setUsers(null)
      }

      if (data) {
        setUsers(data)
        setFetchError(null)
      }
    }
    fetchUsers()
    }
  ,[])
  if(users){
    console.log(users)
  }
  return (
    <div className="page home">
      <h2>Home</h2>
      {fetchError && (<p>{fetchError}</p>)}
      {users && (
        <div>
          {users.map(user => (
            <p key={user.id}>{user.age}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home