<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class AnnouncementController extends Controller
{
    public function addAnnouncement(Request $request)
    {
        //validate the input data
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'announcement' => 'required|max:300',
        ]);

        //return the validator errors
        if ($validator->fails()) {
            return response()->json([
                'data' => $validator->errors(),
                'message' => 'Invalid Data',
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }

        // create the new announcement   
        $announcement = new Announcement();

        $announcement->instructor_id = Auth::id();
        $announcement->title = $request->title;
        $announcement->announcement = $request->announcement;
        $announcement->save();

        //return course data and success message
        return response()->json([
            'data' => $announcement,
            'message' => $announcement->title . ' created successfully',
            'status' =>  Response::HTTP_OK
        ]);
    }
}