<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class AssignmentController extends Controller
{
    public function addAssignment(Request $request)
    {
        //validate the input data
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            // 'assignment_file' => 'required',
            'deadline' => 'required|date|after:' . Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        //return the validator errors
        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        $assignment = new Assignment();
        $assignment->instructor_id = Auth::id();
        $assignment->title = $request->title;
        $assignment->deadline = $request->deadline;

        //store the file
        // Storage::disk('public')->put('users/assignments/' . $decoded_file['file_name'], $decoded_file['file_data']);


        $assignment->save();

        return response()->json([
            'data' => $assignment,
            'message' => $assignment->title . ' created successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

    public function base64Decode($base64_string)
    {
        //split the base64URL from the image data
        @list($type, $file_data) = explode(';', $base64_string);
        //get the file extension
        @list(, $extension) = explode('/', $type);
        //get the file data
        @list(, $file_data) = explode(',', $file_data);
        //specify the full image name
        $file_name = rand(100000, 999999) . time() . '.' . $extension;
        //add it to the array
        return [
            'file_name' => $file_name,
            'file_data' => base64_decode($file_data)
        ];
    }

    public function getAssignment($file)
    {
        return response(asset('storage/users/assignments/' . $file), 200);
    }

    public function submitAssignment(Request $request, $id)
    {
        if (Auth::user()->role == 'student') {
            $student_id = Auth::id();
            $assignment = Assignment::where('_id', $id)->first();

            if ($assignment && $assignment->deadline > Carbon::now()->format('Y-m-d H:i:s')) {

                //validate the input data
                $validator = Validator::make($request->all(), [
                    'assignment_file' => 'required',
                ]);

                //return the validator errors
                if ($validator->fails()) {
                    return response()->json([
                        'data' => $validator->errors(),
                        'message' => 'Invalid Data',
                        'status' => Response::HTTP_INTERNAL_SERVER_ERROR
                    ]);
                }

                //submit assignment
                //check if already submitted
                if (!$assignment->students->contains($student_id)) {
                    $assignment->students()->attach($student_id, ['assignment_file', $request->assignment_file]);

                    return response()->json([
                        'data' => Auth::user()->studentAssignments,
                        'message' => 'You have submitted your assignment Successfully',
                        'status' =>  Response::HTTP_OK
                    ]);
                }
                return response()->json([
                    'data' => $assignment,
                    'message' => 'You have already submitted your assignment Successfully',
                    'status' =>  Response::HTTP_OK
                ]);
            }
            return response()->json([
                'data' => null,
                'message' => 'Assignment not found',
                'status' =>  Response::HTTP_NOT_FOUND
            ]);
        }
        return response()->json([
            'data' => null,
            'message' => 'Only students can submit assignments',
            'status' =>  Response::HTTP_FORBIDDEN
        ]);
    }
}