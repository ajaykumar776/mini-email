<?php

namespace App\Http\Controllers;

use App\Jobs\SendCampaignEmail;
use Illuminate\Http\Request;
use App\Models\Campaign;
use Illuminate\Support\Facades\Storage;
use Exception;

class CampaignController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'csv_file' => 'required|file|mimes:csv,txt',
            ]);

            $csvFilePath = $request->file('csv_file')->store('campaigns');

            $campaign = Campaign::create([
                'name' => $request->name,
                'csv_file' => $csvFilePath,
                'user_id' => $request->user()->id,
                'status' => 'pending',
            ]);

            return response()->json([
                'message' => 'Campaign is being processed. You will be notified via email once the campaign is done.',
                'campaign_id' => $campaign->id
            ]);

        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to create campaign'], 500);
        }
    }

    public function index(Request $request)
    {
        try {
            $campaigns = $request->user()->campaigns()->get();

            return response()->json(['campaigns' => $campaigns]);

        } catch (Exception $e) {
            return response()->json(['error' => 'Failed to fetch campaigns'], 500);
        }
    }
}
