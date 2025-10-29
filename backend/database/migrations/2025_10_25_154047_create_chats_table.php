<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notes', function (Blueprint $table) { 
            $table->id('idNote'); 
            $table->integer('valeur'); 
            $table->text('commentaireOptionnel')->nullable(); 
            $table->unsignedBigInteger('idUtilisateur'); 
            $table->unsignedBigInteger('idActivite'); 
            $table->foreign('idUtilisateur')->references('idUtilisateur')->on('utilisateurs')->onDelete('cascade'); 
            $table->foreign('idActivite')->references('idActivite')->on('activites')->onDelete('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chats');
    }
};
