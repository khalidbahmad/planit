<?php

use Illuminate\Database\Migrations\Migration; 
use Illuminate\Database\Schema\Blueprint; 
use Illuminate\Support\Facades\Schema; 

return new class extends Migration { 
    public function up(): void { 
        Schema::create('participants', function (Blueprint $table) { 
            $table->unsignedBigInteger('idParticipant')->primary(); 
            $table->foreign('idParticipant')->references('idUtilisateur')->on('utilisateurs')->onDelete('cascade'); 
        }); 
    } 
    public function down(): void { 
        Schema::dropIfExists('participants'); 
    } 
};
