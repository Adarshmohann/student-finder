
import React, { useState, useEffect } from 'react';
import '../App.css';
import { baseUrl } from '../config/baseUrl'

const StudentSearch = () => {
    const [name, setname] = useState('');
    const [results, setResults] = useState([]);


    const fetchAllStudents = async () => {

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`/student/searchstudent`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                // console.log("/////",result)
                setResults(result?.students)
            })
            .catch((error) => console.error(error));
    };


    const handleSearch = async () => {
        if (!name) {
            fetchAllStudents();
            return;
        }

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`/student/searchstudent/${name}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                // console.log("???????",result)
                setResults(result?.students)
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchAllStudents();
    }, []);

    return (
        <div>
            <div className="heading-container">
                <h1>...StudenT FindeR...</h1>
            </div>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search students by name"
                    value={name}
                    onChange={e => setname(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div>
                {results.length > 0 ? (
                    <ul>
                        {results.map(student => (
                            <li key={student._id}>
                                <div className="student-info">
                                    <span className="student-name">{student?.name}</span>
                                    <span className="student-details">Email: {student?.email}</span>
                                    <span className="student-details">Standard: {student?.std}</span>
                                    <span className="student-details">Division: {student?.division}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="empty-message">
                        No students found.
                    </div>
                )}
            </div>

        </div>
    );
};

export default StudentSearch;

