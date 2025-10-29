<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->engine = 'InnoDB'; // ✅ Nécessaire pour les contraintes étrangères

            $table->id();
            $table->foreignId('conversation_id')->constrained()->onDelete('cascade');

            // 🔧 Remplacer ici la contrainte vers la clé réelle de la table utilisateurs
            $table->unsignedBigInteger('sender_id');
            $table->foreign('sender_id')
                ->references('idUtilisateur') // 🔹 correspond à ta vraie clé primaire
                ->on('utilisateurs')
                ->onDelete('cascade');

            $table->text('text');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
