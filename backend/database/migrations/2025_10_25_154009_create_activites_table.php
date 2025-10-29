<?php

use Illuminate\Database\Migrations\Migration; 
use Illuminate\Database\Schema\Blueprint; 
use Illuminate\Support\Facades\Schema; 
return new class extends Migration { 
    public function up(): void { 
        Schema::create('activites', function (Blueprint $table) {
            $table->bigIncrements('idActivite');
            $table->string('titre');
            $table->text('description');
            $table->string('type')->nullable();
            $table->string('lieu');
            $table->date('dateActivite');
            $table->time('heureActivite');
            $table->integer('nbMaxParticipants')->default(0);
            $table->string('image')->nullable();
            $table->enum('statut', ['ouverte', 'fermée', 'annulée'])->default('ouverte');
            $table->decimal('rating', 2, 1)->nullable();
            $table->unsignedBigInteger('categorie_id')->nullable();
            $table->unsignedBigInteger('organisateur_id')->nullable();
            $table->timestamps();

            $table->foreign('organisateur_id')
                ->references('idOrganisateur')
                ->on('organisateurs')
                ->onDelete('set null');
        });

    } 
    public function down(): void { 
        Schema::dropIfExists('activites');
    } 
};
    