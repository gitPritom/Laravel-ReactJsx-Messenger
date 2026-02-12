<?php

use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('Online', function ($user) {
    return $user ? new UserResource($user) : null;
});
