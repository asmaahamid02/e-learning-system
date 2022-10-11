<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class CourseController extends Controller
{
    public function addCourse(Request $request)
    {
        //validate the input data
        $validator = Validator::make($request->all(), [
            'code' => 'required|unique:courses,code',
            'title' => 'required',
            'subject' => 'required',
            'description' => 'required|max:300',
            'credits_number' => 'required|numeric',
            'price' => 'required',
        ]);

        //return the validator errors
        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        // create the new course   
        $course = Course::create($request->all());

        //return course data and success message
        return response()->json([
            'data' => $course,
            'message' => $course->code . ' created successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

    public function assignInstructorToCourse($instructor_id, $course_id)
    {
        $course = Course::where('_id', $course_id)->first();
        $instructor = User::where('_id', $instructor_id)->where('role', 'instructor')->first();

        //check if the user and course are existing
        if ($course && $instructor) {

            //check if the course has been assigned to user
            if (!$course->instructors->contains($instructor->id)) {
                $course->instructors()->attach($instructor->id);

                return response()->json([
                    'data' => $instructor->where('_id', $instructor->id)->with('instructorCourses')->first(),
                    'message' => $course->code . ' assigned to ' . $instructor->name . ' Successfully',
                    'status' =>  Response::HTTP_OK
                ]);
            }

            //if the assignment done before
            return response()->json([
                'data' => $instructor->where('_id', $instructor->id)->with('instructorCourses')->first(),
                'message' => $course->code . ' alraedy assigned to ' . $instructor->name,
                'status' =>  Response::HTTP_OK
            ]);
        }

        //if the user/course not found
        return response()->json([
            'data' => null,
            'message' => 'Course/Instructor not found',
            'status' =>  Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    public function assignStudentToCourse($student_id, $course_id)
    {
        $course = Course::where('_id', $course_id)->first();
        $student = User::where('_id', $student_id)->where('role', 'student')->first();

        //check if the user and course are existing
        if ($course && $student) {

            //check if the course has been assigned to user
            if (!$course->students->contains($student->id)) {
                $course->students()->attach($student->id);

                return response()->json([
                    'data' => $student->where('_id', $student->id)->with('studentCourses')->first(),
                    'message' => $course->code . ' assigned to ' . $student->name . ' Successfully',
                    'status' =>  Response::HTTP_OK
                ]);
            }

            //if the assignment done before
            return response()->json([
                'data' => $student->where('_id', $student->id)->with('studentCourses')->first(),
                'message' => $course->code . ' alraedy assigned to ' . $student->name,
                'status' =>  Response::HTTP_OK
            ]);
        }

        //if the user/course not found
        return response()->json([
            'data' => null,
            'message' => 'Course/Student not found',
            'status' =>  Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    public function getEnrolledCourses()
    {
        if (Auth::user()->role == 'student') {
            $courses = Auth::user()->studentCourses;

            if ($courses->isNotEmpty()) {
                return response()->json([
                    'data' => $courses,
                    'message' => 'Courses found',
                    'status' =>  Response::HTTP_OK
                ]);
            }
            return response()->json([
                'data' => null,
                'message' => 'No Courses found',
                'status' =>  Response::HTTP_NOT_FOUND
            ]);
        }

        //if the user is not student
        return response()->json([
            'data' => null,
            'message' => 'Only students can view their courses',
            'status' =>  Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }

    public function getInstructorCourses($instructor_id)
    {
        $instructor =  User::where('_id', $instructor_id)->first();

        if ($instructor) {
            $courses = $instructor->instructorCourses;

            if ($courses->isNotEmpty()) {

                return response()->json([
                    'data' => $courses,
                    'message' => 'Courses found',
                    'status' =>  Response::HTTP_OK
                ]);
            }
            return response()->json([
                'data' => null,
                'message' => 'No Courses found',
                'status' =>  Response::HTTP_NOT_FOUND
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Instructor not found',
            'status' =>  Response::HTTP_NOT_FOUND
        ]);
    }
}