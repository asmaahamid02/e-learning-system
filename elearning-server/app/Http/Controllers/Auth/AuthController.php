<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        //validate the input data
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:5|max:20',
            'role' => 'required'
        ]);

        //return the validator errors
        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        //create the new user        
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
        ]);

        //return user data and success message
        return response()->json([
            'data' => $user,
            'message' => 'Account Registered Successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        //validate the input data
        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|min:5|max:20',
        ]);

        //return the validator errors
        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        //Request is validated
        //Create token
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'data' => null,
                    'message' => 'Email/Password is wrong!',
                    'status' => Response::HTTP_UNAUTHORIZED
                ]);
            }
        } catch (JWTException $e) {
            return $credentials;
            return response()->json([
                'data' => null,
                'message' => 'Could not create token',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        //Token created, return with success response and jwt token
        $user = auth()->user();
        $user->token = $token;

        return response()->json([
            'data' => $user,
            'message' => 'Logged In Successfully',
            'status' => Response::HTTP_OK
        ]);
    }

    public function logout(Request $request)
    {
        //valid credential
        $validator = Validator::make($request->only('token'), [
            'token' => 'required'
        ]);

        //Send failed response if request is not valid
        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid token',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        return response()->json([
            'data' => null,
            'message' => 'User has been logged out',
            'status' => Response::HTTP_OK
        ]);
    }
}