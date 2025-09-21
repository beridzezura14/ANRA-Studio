import Course from "../models/Course.js";

// @desc    Create new course
// @route   POST /api/courses
// @access  Public ან Protected (შენზეა დამოკიდებული)
export const createCourse = async (req, res) => {
  try {
    const { image, title, topics } = req.body;

    const course = new Course({
      image,
      title,
      topics,
    });

    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single course by id
// @route   GET /api/courses/:id
// @access  Public
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Protected (ან Public, შენზეა დამოკიდებული)
export const updateCourse = async (req, res) => {
  try {
    const { image, title, topics } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.image = image || course.image;
    course.title = title || course.title;
    course.topics = topics || course.topics;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Protected
// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Protected
export const deleteCourse = async (req, res) => {
  try {
    const { password } = req.body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.deleteOne();
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addTopicToCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const { title, videoUrl, description } = req.body;
    if (!title || !videoUrl || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    course.topics.push({ title, videoUrl, description });
    await course.save();

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// @desc    Delete topic from course
// @route   DELETE /api/courses/:courseId/topics/:topicId
// @access  Protected
export const deleteTopicFromCourse = async (req, res) => {
  console.log("👉 DELETE request params:", req.params); 
  // მაგალითად { id: '68cea25...', topicId: '68ceaa9...' }

  const { id, topicId } = req.params;

  try {
    const course = await Course.findById(id);
    console.log("👉 Found course:", course ? course.title : "null");

    if (!course) return res.status(404).json({ message: "Course not found" });

    const topic = course.topics.id(topicId);
    console.log("👉 Found topic:", topic ? topic.title : "null");

    if (!topic) return res.status(404).json({ message: "Topic not found" });

    topic.deleteOne();
    await course.save();
    

    res.json(course);
  } catch (error) {
    console.error("❌ Error deleting topic:", error);
    res.status(500).json({ message: "Error deleting topic" });
  }
};


// @desc    Update topic in course
// @route   PUT /api/courses/:courseId/topics/:topicId
// @access  Protected
export const updateTopicInCourse = async (req, res) => {
  const { id, topicId } = req.params;
  const { title, videoUrl, description, password } = req.body;

  try {
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const topic = course.topics.id(topicId);
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    // განახლება
    if (title) topic.title = title;
    if (videoUrl) topic.videoUrl = videoUrl;
    if (description) topic.description = description;

    await course.save();

    res.json(course);
  } catch (error) {
    console.error("❌ Error updating topic:", error);
    res.status(500).json({ message: "Error updating topic" });
  }
};
