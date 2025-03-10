<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable = [
        'name',
        'phone_number',
        'email',
        'price',
        'ticket_type_id',
        'transaction_id',
        'quantity',
        'scanned',
        'event_id',
    ];

    public function ticketType()
    {
        return $this->belongsTo(TicketType::class);
    }

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
