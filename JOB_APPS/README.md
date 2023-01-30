//UPDATE A JOB
const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (!position || !company) {
    throw new BadRequestError('Please provide all values');
  }
  const job = await Job.findOne({ _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id :${jobId}`);
  }
  //   // check permissions

  checkPermissions(req.user, job.createdBy);

  //  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
  //    new: true,
  //    runValidators: true,
  //  });
  job.position = position;
  job.company = company;

  await job.save()
  res.status(StatusCodes.OK).json({ job });
};