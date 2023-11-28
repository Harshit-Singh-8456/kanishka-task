const Job = require("../models/jobs");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
    try {
        const { search, page, limit } = req.query;
        const queryObject = {};

        if (search) {
            const searchRegex = { $regex: search, $options: 'i' };

            // Build the queryObject with regex conditions for multiple fields
            queryObject.$or = [
                { firstName: searchRegex },
                { lastName: searchRegex },
                { email: searchRegex }
                // Add more fields as needed
            ];
        }

        // Count total documents in the collection based on the query
        const totalCount = await Job.countDocuments(queryObject);

        // Fetch paginated data
        const jobs = await Job.find(queryObject)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        if (jobs.length === 0) {
            return res.status(404).json({ status: false, message: "No data found" });
        }

        res.status(200).json({ status: true, data: jobs, count: totalCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};




const getJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findOne({ _id: id }).sort(
        "createdAt"
    );
    if (!job) {
        throw new NotFoundError(`No job with id ${id}`);
    }
    res.status(201).json({ status: true, data: job });
};

const createJob = async (req, res) => {
    const job = await Job.create(req.body);
    res.status(201).json({ status: true, data: job });
};

const updateJob = async (req, res) => {
    const {
        body: { firstName, lastName, email, dob, gender, education, company, experience, package },
        params: { id: jobId },
    } = req;

    if (firstName === "" || lastName === "" || dob === "" || gender === "" || education === "" || experience === "" || package === "" || email === "" || company === "") {
        throw new BadRequestError("All fields must be provided");
    }
    const job = await Job.findByIdAndUpdate(
        { _id: jobId },
        req.body,
        { new: true, runValidators: true }
    );
    res.status(200).json({ status: true, msg: "Data updated SucessFully", data: job });
};

const deleteJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete({ _id: id });

    if (!job) {
        throw new NotFoundError(`No job with id ${id}`);
    }
    res.status(200).json({ msg: 'Job deleted successfully' });
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};
