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
            'assignment_file' => 'required',
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

        $decoded_file = $this->base64Decode($request->assignment_file);

        $assignment = new Assignment();
        $assignment->instructor_id = Auth::id();
        $assignment->title = $request->title;
        $assignment->deadline = $request->deadline;

        $file_path = 'users/assignments/' . Auth::id() . '/' . $decoded_file['file_name'];
        Storage::disk('public')->put($file_path, $decoded_file['file_data']);

        $assignment->file_path = $file_path;

        $assignment->save();
        //return course data and success message
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
}