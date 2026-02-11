<?php

namespace Database\Factories;

use App\Models\{User, Group};
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::pluck('id')->toArray();

        $senderId = $this->faker->randomElement($users);
        $recevierId = $this->faker->randomElement(array_values(array_diff($users, [$senderId])));

        // if ($senderId === 0) {
        //     $senderId = $this->faker->randomElement(User::where('id', '!=', 1)->pluck('id')->toArray());
        //     $recevierId = 1;
        // } else {
        //     $recevierId = $this->faker->randomElement(User::pluck('id')->toArray());
        // }

        $groupId = null;

        if ($this->faker->boolean(50)) {
            $group = Group::with('users')->inRandomOrder()->first();
            if ($group && $group->users->isNotEmpty()) {
                $groupId = $group->id;
                $senderId = $group->users->random()->id;
                $receiverId = null;
            }
        }

        return [
            'sender_id' => $senderId,
            'receiver_id' => $recevierId,
            'group_id' => $groupId,
            'message' => $this->faker->realText(200),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
