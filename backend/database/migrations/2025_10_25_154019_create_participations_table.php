<?php

use Illuminate\Database\Migrations\Migration; 
use Illuminate\Database\Schema\Blueprint; 
use Illuminate\Support\Facades\Schema; 
return new class extends Migration { 
    public function up(): void { 
        Schema::create('participations', function (Blueprint $table) { 
            $table->unsignedBigInteger('idParticipant'); 
            $table->unsignedBigInteger('idActivite'); 
            $table->timestamp('dateParticipation')->useCurrent(); 
            $table->primary(['idParticipant', 'idActivite']); 
            $table->foreign('idParticipant')->references('idParticipant')->on('participants')->onDelete('cascade'); 
            $table->foreign('idActivite')->references('idActivite')->on('activites')->onDelete('cascade'); 
            $table->timestamps();
        });
    } 
    public function down(): void { 
        Schema::dropIfExists('participations'); 
    } 
};
