<?php

use Illuminate\Database\Migrations\Migration; 
use Illuminate\Database\Schema\Blueprint; 
use Illuminate\Support\Facades\Schema; 
return new class extends Migration { 
    public function up(): void { 
        Schema::create('administrateurs', function (Blueprint $table) { 
            $table->unsignedBigInteger('idAdministrateur')->primary(); 
            $table->foreign('idAdministrateur')->references('idUtilisateur')->on('utilisateurs')->onDelete('cascade'); 
        }); 
    } 
    public function down(): void { 
        Schema::dropIfExists('administrateurs'); 
    } 
};
