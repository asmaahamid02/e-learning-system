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
            'code' => 'required',
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
        $instructor = User::where('_id', $instructor_id)->first();


        if ($course && $instructor) {

            if (!$course->instructors->contains($instructor->id)) {
                $course->instructors()->attach($instructor->id);

                return response()->json([
                    'data' => $course,
                    'message' => 'Updated Successfully',
                    'status' =>  Response::HTTP_OK
                ]);
            }

            return response()->json([
                'data' => null,
                'message' => 'Already Existed',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'Course/Instructor not found',
            'status' =>  Response::HTTP_INTERNAL_SERVER_ERROR
        ]);
    }
}