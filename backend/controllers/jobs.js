const Job = require("../models/jobs");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
    const job = await Job.find({}).sort("createdAt");
    res.status(200).json({ status: true, data: job, count: job.length });
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
