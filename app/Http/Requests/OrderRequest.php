<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => 'required',
            'total_amount' => 'required'
        ];
    }
    public function messages()
    {
        return [
            'user_id.required' => 'user id has required!',
            'total_amount.required' => 'total amount has required!',
        ];
    }
}
