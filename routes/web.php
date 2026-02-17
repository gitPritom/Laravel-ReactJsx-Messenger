<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::middleware(['auth', 'verified'])->group(function () {
    Route::controller(HomeController::class)->group(function () {
        Route::get('/', 'home')->name('dashboard');
    });

    Route::controller(MessageController::class)->group(function () {
        Route::get('/user/{user}', 'byUser')->name('chat.user');
        Route::get('/group/{group}', 'byGroup')->name('chat.group');
        Route::post('/message', 'store')->name('message.store');
        Route::delete('/message/{message}', 'destory')->name('message.destory');
        Route::get('/message/older/{message}', 'loadOlder')->name('message.loadOlder');
    });
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
