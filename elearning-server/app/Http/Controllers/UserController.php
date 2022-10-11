<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function addUser(Request $request)
    {
        //validate the input data
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:5|max:20',
            'role' => 'required|in:student,instructor',
            'dob' => 'required:date',
            'phone_number' => 'required|min:10|regex:/^([0-9\s\-\+\(\)]*)$/',
            'gender' => 'required',
        ]);

        //return the validator errors
        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        $data = $request->all();
        $data['password'] = bcrypt($request->password);

        // create the new user   
        $user = User::create($data);

        //return user data and success message
        return response()->json([
            'data' => $user,
            'message' => Str::ucfirst($user->role) . ' Registered Successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

    public function getInstructors()
    {
        $instructors = User::where('role', 'instructor')->orderBy('created_at', 'DESC')->get();

        if ($instructors->isNotEmpty()) {
            return response()->json([
                'data' => $instructors,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'No Instructors',
            'status' => Response::HTTP_OK
        ]);
    }

    public function getStudents()
    {
        $students = User::where('role', 'student')->orderBy('created_at', 'DESC')->get();

        if ($students->isNotEmpty()) {
            return response()->json([
                'data' => $students,
                'message' => 'Found',
                'status' =>  Response::HTTP_OK
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'No Instructors',
            'status' => Response::HTTP_OK
        ]);
    }
}