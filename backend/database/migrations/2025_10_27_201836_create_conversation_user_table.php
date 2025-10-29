<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('conversation_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained()->onDelete('cascade');

            $table->unsignedBigInteger('utilisateur_id'); // 🔹 création manuelle de la colonne
            $table->foreign('utilisateur_id')
                ->references('idUtilisateur') // 🔹 clé primaire réelle de la table utilisateurs
                ->on('utilisateurs')
                ->onDelete('cascade');

            $table->timestamps();
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('conversation_user');
    }
};
