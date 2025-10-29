<?php

use Illuminate\Database\Migrations\Migration; 
use Illuminate\Database\Schema\Blueprint; 
use Illuminate\Support\Facades\Schema; 

return new class extends Migration { 
    public function up(): void {
         Schema::create('utilisateurs', 
         function (Blueprint $table) { 
            $table->id('idUtilisateur'); 
            $table->string('nom'); 
            $table->string('prenom'); 
            $table->string('email')->unique(); 
            $table->string('motDePasse');
            $table->string('photoProfil')->nullable(); 
            $table->text('bio')->nullable(); 
            $table->string('ville')->nullable(); 
            $table->enum('statut', ['actif', 'suspendu'])->default('actif'); 
            $table->enum('typeUtilisateur', ['participant', 'organisateur', 'administrateur']); 
            $table->timestamps(); 
        }); 
    } 
    public function down(): void { 
        Schema::dropIfExists('utilisateurs'); 
    } 
};