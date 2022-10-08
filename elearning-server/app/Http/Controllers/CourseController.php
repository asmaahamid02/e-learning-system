<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
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
}