const Student = require('../models/Student')

const addStudent = async (req, res) => {
    try {
        const { name, email, std, division } = req.body;

        if (!name || !email || !std || !division) {
            return res.status(500).json({
                status: false,
                error: true,
                message: "missing mandatory fields"
            })
        }
        const newStudent = new Student({ name, email, std, division });
        await newStudent.save();
        return res.status(201).json({
            status: true,
            error: false,
            message: "student added successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            error: true,
            message: "Unhandled error"
        })
    }
}

const searchStudent = async (req, res) => {
    try {
        const name = req.params.name;

        let students;

        if (name) {
            // Search for students whose name starts with the provided letter
            students = await Student.find({ name: { $regex: `^${name}`, $options: 'i' } });

            if (students.length === 0) {
                return res.status(404).json({
                    status: true,
                    error: false,
                    message: `No students found with names starting with "${name}"`,
                    students: []
                });
            }
        } else {
           
            students = await Student.find();
        }

        return res.status(200).json({
            status: true,
            error: false,
            message: students.length > 0 ? "Students found" : "No students found",
            students: students
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            error: true,
            message: "Internal server error"
        });
    }
};



module.exports = {addStudent, searchStudent }