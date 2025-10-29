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
        Schema::create('commentaires', function (Blueprint $table) { 
            $table->id('idCommentaire'); 
            $table->text('contenu'); 
            $table->timestamp('dateCommentaire')->useCurrent(); 
            $table->unsignedBigInteger('idUtilisateur'); 
            $table->unsignedBigInteger('idActivite'); 
            $table->foreign('idUtilisateur')->references('idUtilisateur')->on('utilisateurs')->onDelete('cascade'); 
            $table->foreign('idActivite')->references('idActivite')->on('activites')->onDelete('cascade'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commentaires');
    }
};
